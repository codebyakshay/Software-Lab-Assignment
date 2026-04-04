import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from './endpoint';

// Create a configured axios instance
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request Interceptor: Inject auth tokens, etc.
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Note: Token injection (MMKV) will be added here after user approval
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Extract data, handle global errors
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return early if status is okay
    return response.data;
  },
  (error: AxiosError) => {
    // Global error handling can be added here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.warn('API Response Error:', error.response.status, error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('API Network Error:', error.message);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('API Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
