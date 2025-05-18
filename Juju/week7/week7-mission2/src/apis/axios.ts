import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { InternalAxiosRequestConfig } from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustominternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  retry?: boolean; // 요청 재시도 여부를 나타내는 플래그.
  
}

// 전역 변수로 refresh 요청에 Promise를 저장하여 중복 요청을 방지함.
let refreshPromise:Promise<string> | null = null;

export const axiosInstance = axios.create({
    baseURL: "",
});

// 요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가.
axiosInstance.interceptors.request.use((config) => {
  const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const accessToken = getItem();  // 로컬 스토리지에서 accessToken을 가져옴

  console.log("[INTERCEPTOR] 토큰:", accessToken);

  // accessToken이 존재하면 Authorization 헤더에 Bearer 토큰 형식으로 추가
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  
  // 수정된 요청 설정을 반영함.
  return config;
},  // 요청 인터셉터가 실패하면 에러 뿜음.
  (error) => Promise.reject(error),
);

// 응답 인터셉터: 401 에러 발생 시 refreshToken을 사용하여 accessToken을 갱신.
axiosInstance.interceptors.response.use(
  (response) => response, // 응답이 성공하면 그대로 반환
  async (error) => {
    const originalRequest: CustominternalAxiosRequestConfig = error.config;

    // 401 에러이면서 아직 재시도하지 않은 요청일 경우 처리
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest.retry
    ) {
        // refresh endpoint의 401 에러가 발생한 경우 (unauthorized), 중복 재시도 방지를 위해 로그아웃 처리.
        if (originalRequest.url === "/v1/auth/refresh") {
          const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
          const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
          
          removeAccessToken();
          removeRefreshToken();
          window.location.href = "/login"; // 로그인 페이지로 리다이렉트
          return Promise.reject(error);
        }

        // 재시도 플래그 설정.
        originalRequest.retry = true;

        // 이미 리프레시 요청이 진행 중이면, 그 Promise를 재사용
        if (!refreshPromise) {
          // refresh 요청 실행 후, 프라미스를 전역 변수에 할당.
          refreshPromise = (async () => {
            const { getItem: getRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken,
            );
            const refreshToken = getRefreshToken(); // 로컬 스토리지에서 refreshToken을 가져옴

            const { data } = await axiosInstance.post("/v1/auth/refresh", {
              refresh:refreshToken,
            });
            // 새 토큰이 반환
            const { setItem: setAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken
            );
            const { setItem: setRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken
            );

            setAccessToken(data.data.access);
            setRefreshToken(data.data.refresh);

            // 새 accessToken을 반환하여 다른 요청들이 이것을 사용할 수 있게 함.
            return data.data.accessToken;
          })()
          .catch(() => {
            const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
            const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
            removeAccessToken();
            removeRefreshToken();
          }).finally(() => {
            refreshPromise = null;
          });
        }

        // 진행 중인 refreshPromise가 해결될 때까지 기다림.
        return refreshPromise?.then(newAccessToken => {
          // 원본 요청의 Authorization 헤더를 갱신된 토큰으로 업데이트.
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          // 업데이트된 원본 요청을 제시도.
          return axiosInstance.request(originalRequest);
        });
      }
      // 401 에러가 발생한 경우, 그대로 오류를 반환.
      return Promise.reject(error);
    }
)