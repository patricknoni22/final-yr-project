import axios from "axios";
import { API_BASE_URL } from "../config/api";
import {
  clearAuthSession,
  getAuthSession,
  setAuthSession,
} from "../features/auth/utils/authStorage";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getAuthSession()?.accessToken;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

let refreshRequest;

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const auth = getAuthSession();

    if (error.response?.status !== 401 || request?._retry || !auth?.refreshToken) {
      return Promise.reject(error);
    }

    request._retry = true;
    try {
      refreshRequest ??= axios
        .post(`${API_BASE_URL}/new-access-token`, { refreshToken: auth.refreshToken })
        .then((response) => response.data.data.accessToken)
        .finally(() => {
          refreshRequest = null;
        });

      const accessToken = await refreshRequest;
      setAuthSession({ ...auth, accessToken });
      request.headers.Authorization = `Bearer ${accessToken}`;
      return apiClient(request);
    } catch (refreshError) {
      clearAuthSession();
      return Promise.reject(refreshError);
    }
  },
);
