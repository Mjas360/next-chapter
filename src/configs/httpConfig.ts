import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Config from 'react-native-config';
import { setAccessToken } from '~/redux/reducers/userSlice';
import { store } from '~/redux/store';
import { getSecureKey, setSecureKey } from '~/services/secureKeychain';
import { clearAuthSession } from '~/sessions/handleLogout';
import { endpoints } from '~/utils/endpoints';

export const BASE_URL = Config.API_URL;

export const http = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

let isRefreshing = false;
let subscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  subscribers.push(cb);
};

const onRefreshed = (token: string) => {
  subscribers.forEach(cb => cb(token));
  subscribers = [];
};

http.interceptors.request.use(
  async (config: any) => {
    try {
      // 1. Get from Redux (fast path)
      let token = store.getState().userReducer.accessToken;

      // 2. Fallback to Secure Storage (cold start / biometric unlock future)
      if (!token) {
        token = (await getSecureKey('access_token')) || undefined;
      }

      // 3. Attach token if exists
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
      }

      return config;
    } catch (err) {
      return config;
    }
  },
  (error: AxiosError) => Promise.reject(error),
);

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response?.status;

    if (status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise(resolve => {
        subscribeTokenRefresh((newToken: string) => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };
          resolve(http(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = (await getSecureKey('refresh_token')) || undefined;

      const res = await axios.post(`${BASE_URL}${endpoints.REFRESH_TOKEN}`, {
        refresh_token: refreshToken,
      });

      const newAccessToken = res.data?.access_token;
      const newRefreshToken = res.data?.refresh_token;

      if (!newAccessToken) {
        throw new Error('No access token returned');
      }

      store.dispatch(setAccessToken(newAccessToken));

      await setSecureKey('access_token', newAccessToken);

      if (newRefreshToken) {
        await setSecureKey('refresh_token', newRefreshToken);
      }

      onRefreshed(newAccessToken);

      // retry original request
      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      return http(originalRequest);
    } catch (refreshError) {
      await clearAuthSession();
      subscribers = [];
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
