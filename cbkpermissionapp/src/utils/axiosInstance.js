// src/utils/axiosInstance.js
import axios from 'axios';
import Cookies from 'js-cookie';

// أولويّات قراءة الـ API URL (متوافقة مع CRA/Webpack)
const baseURL =
  process.env.REACT_APP_API_URL ||                 // من .env (CRA/Webpack)
  (typeof window !== 'undefined' && window.__DASHO_API__) || // من index.html إذا حقنته
  'http://localhost:5000';                         // الافتراضي محلياً

const instance = axios.create({
  baseURL,
  withCredentials: false,
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url || '';

    // 🔒 401 يعني التوكن غير صالح/منتهي: اعمل تسجيل خروج
    if (status === 401 && !url.includes('/signin')) {
      Cookies.remove('token');
      Cookies.remove('user');
      window.location.href = '/signin';
      return Promise.reject(error);
    }

    // ⛔ 403 يعني مافي صلاحية: لا تعمل لوج آوت، خليه بس يرجّع الخطأ
    // (خليه يُتعالج بالـ UI كرسالة "Access denied" بدون ريديركت)
    return Promise.reject(error);
  }
);
export default instance;
