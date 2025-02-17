import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAppStore } from '../store';
import { notificationService } from '../services/notification.service';

export const setupInterceptors = (axiosInstance: typeof axios) => {
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
      }

      const errorMessage = error.response?.data?.message || 'Une erreur est survenue';
      notificationService.error(errorMessage);
      return Promise.reject(error);
    }
  );
};