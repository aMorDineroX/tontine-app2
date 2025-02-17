import axios from 'axios';
import { API_CONFIG } from '../config/api.config';
import { AppError, ErrorCodes } from '../errors';

const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      throw new AppError(401, 'Session expired', ErrorCodes.UNAUTHORIZED);
    }
    throw error;
  }
);

export default api;
