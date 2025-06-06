import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: 'https://api.dashoprojects.com',
});

// Intercept each response
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      Cookies.remove('token');
      Cookies.remove('user');
      window.location.href = '/signin'; // Redirect to login
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
