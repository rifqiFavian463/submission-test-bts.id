import axios from "axios";

import { clearAccessToken, getAccessToken } from "@/utils/storage";

export const http = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL?.toString() ?? "https://api.escuelajs.co/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

http.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401) {
      clearAccessToken();
      // keep it simple and framework-agnostic
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

