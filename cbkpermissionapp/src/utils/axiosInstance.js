// src/utils/axiosInstance.js
import axios from "axios";
import Cookies from "js-cookie";

const baseURL =
  process.env.REACT_APP_API_BASE_URL ||
  `${window.location.protocol}//${window.location.hostname}:5000`;

const instance = axios.create({ baseURL });

instance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

instance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url || '';
    if (status === 401 && !url.includes('/signin')) {
      Cookies.remove('token');
      Cookies.remove('user');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);
export default instance;
