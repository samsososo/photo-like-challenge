import {
  AxiosHeaders,
  type AxiosInstance,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import store from '../redux/store';

export function assignInterceptor(
  axiosApiInstance: AxiosInstance,
): AxiosInstance {
  axiosApiInstance.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      try {
        const state = store.getState();

        return config;
      } catch (error) {
        console.error('Request config error:', error);
        throw error;
      }
    },
    error => {
      console.error('Request failed:', error);
      return Promise.reject(error);
    },
  );

  axiosApiInstance.interceptors.response.use((response: AxiosResponse) => {
    return response;
  });

  return axiosApiInstance;
}
