import axios from 'axios';
import { storage } from './storage';
import { API_BASE_URL } from '@env';

const baseURL = API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url || '';

    if (status === 401 && !url.includes('/signin')) {
      // Clear stored credentials on unauthorized
      await storage.clearAll();
      // Navigation will be handled by context
    }

    return Promise.reject(error);
  }
);

export default api;
