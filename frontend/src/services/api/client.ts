import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach token and tenant
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    const tenantSlug = localStorage.getItem('tenantSlug');

    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (tenantSlug) config.headers['x-tenant-id'] = tenantSlug;

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor — auto refresh token
let isRefreshing = false;
let failedQueue: Array<{ resolve: Function; reject: Function }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => (error ? reject(error) : resolve(token)));
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
        const { accessToken, refreshToken: newRefreshToken } = response.data.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);
        apiClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

        processQueue(null, accessToken);
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    const message = (error.response?.data as any)?.message || error.message || 'An error occurred';
    if (error.response?.status !== 401) toast.error(message);

    return Promise.reject(error);
  },
);

// Convenience methods
export const api = {
  get: <T = any>(url: string, params?: any) => apiClient.get<T>(url, { params }).then((r) => r.data),
  post: <T = any>(url: string, data?: any) => apiClient.post<T>(url, data).then((r) => r.data),
  put: <T = any>(url: string, data?: any) => apiClient.put<T>(url, data).then((r) => r.data),
  patch: <T = any>(url: string, data?: any) => apiClient.patch<T>(url, data).then((r) => r.data),
  delete: <T = any>(url: string) => apiClient.delete<T>(url).then((r) => r.data),
};
