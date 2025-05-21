// src/apis/axios.ts
import axios from "axios";
import { doLogout } from "../utils/logout";
import { refreshAccessToken } from "./auth";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true, // Refresh Token 쿠키 자동 전송
});

// --- 응답 인터셉터: 401 발생 시에
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    const isRefreshEndpoint = originalRequest.url?.includes("/v1/auth/refresh");

    // 1) 401 && 아직 _retry 안 함 && refresh 호출이 아닌 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshEndpoint
    ) {
      originalRequest._retry = true;
      try {
        // 2) 토큰 재발급
        const { accessToken } = await refreshAccessToken();

        // 3) 재시도 요청에만 새 토큰 헤더 세팅
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${accessToken}`,
        };

        // 4) 원래 요청 재시도
        return axiosInstance(originalRequest);n
      } catch (refreshError) {
        // 5) 리프레시도 실패하면 로그아웃 처리
        await doLogout();
        return Promise.reject(refreshError);
      }
    }

    // 그 외 에러/조건은 모두 그대로 reject
    return Promise.reject(error);
  }
);