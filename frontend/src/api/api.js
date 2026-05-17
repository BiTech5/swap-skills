import axios from "axios";
import { API_URLS } from "./apiRoutes";
import useAuthStore from "../store/authStore";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({ baseURL });
const refreshApi = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshTokenRequest = null;

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("Missing refresh token");
  }

  const response = await refreshApi.post(API_URLS.AUTH.REFRESH, { refreshToken });
  const accessToken = response.data?.accessToken || response.data?.token;
  const newRefreshToken = response.data?.refreshToken;

  if (!accessToken) {
    throw new Error("Refresh response did not include an access token");
  }

  useAuthStore.getState().login(accessToken, newRefreshToken || refreshToken);
  return accessToken;
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url === API_URLS.AUTH.REFRESH
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      refreshTokenRequest = refreshTokenRequest || refreshAccessToken();
      const accessToken = await refreshTokenRequest;
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${accessToken}`;
      return api(originalRequest);
    } catch (refreshError) {
      useAuthStore.getState().logout();
      return Promise.reject(refreshError);
    } finally {
      refreshTokenRequest = null;
    }
  },
);

export default api;
