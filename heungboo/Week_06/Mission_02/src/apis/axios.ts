import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청 재시도를 나타내는 플래그 ..
}

// 전역 변수로 refreshPromise 를 저장해서 중복 요청을 방지합니다.
// refreshPromise 가 null 이면 새로운 요청을 보내고, null 이 아니면 기존 요청을 사용합니다.
let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 요청 인터셉터 : 모든 요청 전에 accessToken 을 헤더에 추가합니다.
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem();

    // accessToken 이 존재하는 경우에 Authorization 헤더를 추가합니다.
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // (config) => {
    //   const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    //   return config;
    // },
    // (error) => {
    //   return Promise.reject(error);
    // }
    return config;
  },
  // 요청 인터셉터 실패 시 에러를 처리합니다.
  (error) => {
    // 요청 에러 처리
    return Promise.reject(error);
  }
);

// 응답 인터셉터: 401 에러 발생 시 refreshToken을 통해서 accessToken 을 갱신.
axiosInstance.interceptors.response.use(
  (response) => {
    // 응답이 성공적인 경우 그대로 응답을 반환합니다.
    return response;
  },
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    // 401 에러이면서 재시도하지 않은 경우에만 처리합니다.
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // refresh 엔드 포인트에서 401 에러가 발생한 경우 => 중복 재시도 방지를 위해 로그아웃 처리합니다.
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );

        removeAccessToken();
        removeRefreshToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // 재시도 플래그 설정
      originalRequest._retry = true;

      // 이미 refreshPromise 가 존재하는 경우, 기존 Promise 를 재사용
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );
          const refreshToken = getRefreshToken();

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });

          // 새 토큰 반환
          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken
          );

          setAccessToken(data.data.access);
          setRefreshToken(data.data.access);

          return data.data.accessToken;
        })()
          .catch((error) => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );
            removeAccessToken();
            removeRefreshToken();
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      // 진행중인 refreshPromise 가 해결될 때까지 기다림.
      return refreshPromise?.then((newAccessToken: string) => {
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      });
    }
    return Promise.reject(error);
  }
);
