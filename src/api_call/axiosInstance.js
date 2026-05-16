import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8007/api';

// Public instance — no auth header
export const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Private instance — auth header injected by interceptor
export const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Getters are set by AuthContext so interceptors always read the latest values.
let getAccessToken  = () => localStorage.getItem('accessToken');
let getRefreshToken = () => localStorage.getItem('refreshToken');

export const setTokenGetters = (accessTokenGetter, refreshTokenGetter) => {
  getAccessToken  = accessTokenGetter;
  getRefreshToken = refreshTokenGetter;
};

// Attach access token to every private request.
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

const redirectToLogin = () => {
  localStorage.clear();
  window.location.href = '/login';
};

// Attempt a silent token refresh on 401; redirect to login on failure.
axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    // Prevent refresh loops if the refresh endpoint itself returns 401.
    if (originalRequest.url?.includes('/v1/accounts/auth/token/refresh/') || originalRequest.url?.includes('/auth/refresh')) {
      redirectToLogin();
      return Promise.reject(error);
    }

    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      redirectToLogin();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const { data } = await axiosPublic.post('/v1/accounts/auth/token/refresh/', { refresh: refreshToken });

      const newAccessToken  = data.access  ?? data.accessToken  ?? null;
      const newRefreshToken = data.refresh ?? data.refreshToken ?? null;

      if (!newAccessToken) {
        redirectToLogin();
        return Promise.reject(error);
      }

      localStorage.setItem('accessToken', newAccessToken);
      if (newRefreshToken) localStorage.setItem('refreshToken', newRefreshToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosPrivate(originalRequest); // retry the original request
    } catch {
      redirectToLogin();
      return Promise.reject(error);
    }
  },
);