import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// Add request interceptor to update Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    if (token) {
      // Remove quotes from token if they exist
      const cleanToken = token.replace(/^"|"$/g, '');
      config.headers.Authorization = `Bearer ${cleanToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

  