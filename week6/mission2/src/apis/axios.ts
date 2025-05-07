import axios, { InternalAxiosRequestConfig } from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
console.log('BASE_URL 확인:', import.meta.env.VITE_SERVER_API_URL);


interface CustominternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null; //  const -> let 으로 변경

const baseURL = import.meta.env.VITE_SERVER_API_URL;
console.log('BASE_URL 확인:', baseURL);

export const axiosInstance = axios.create({
  baseURL: baseURL || "http://localhost:8000",
});


axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: CustominternalAxiosRequestConfig = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (originalRequest.url === '/v1/auth/refresh') {
        const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          const refreshToken = getRefreshToken();
          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });

          const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          return data.data.accessToken;
        })()
          .catch((error) => {
            const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken); //  여기 = 추가
            removeAccessToken();
            removeRefreshToken();
            window.location.href = "/login"; // 실패하면 강제 로그인
            return Promise.reject(error);
          })
          .finally(() => {
            refreshPromise = null; //  완료되면 초기화
          });
      }

      try {
        const newAccessToken = await refreshPromise;
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance.request(originalRequest); //  원래 요청 재시도
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 마지막에는 항상 이거
  }
);