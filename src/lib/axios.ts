import Axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
// import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

import { API_URL } from '@/config';
import storage from '@/utils/storage';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = storage.getToken();

  config.headers = {
    ...config.headers,
    Accept: 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error: AxiosError) => {
    const message = error.response?.statusText || error.message;
    if (error.response?.status === 401) {
      // Unauthorized
      storage.clearToken();
    }

    console.error({
      type: 'error',
      title: 'Error',
      message,
    });

    return Promise.reject(error);
  },
);
