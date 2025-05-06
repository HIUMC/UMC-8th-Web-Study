import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
  console.log("[INTERCEPTOR] 토큰:", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("[INTERCEPTOR] 설정한 헤더:", config.headers.Authorization);
  }
  return config;
});

export default axiosInstance;