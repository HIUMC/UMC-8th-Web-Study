import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";
import { useLocalStorage } from "../hooks/useLocalStorage.ts";

interface CustomInternalAxiosReqeustConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청 재시도 여부를 나타내는 플래그
}

//전역 변수로 refresh 요청의 promise를 저장해서 중복 요청을 방지함.
let refreshPromise: Promise<string | null> = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// 요청 인터셉터 : 모든 요청 전에 accessToken을 헤더에 추가한다.
axiosInstance.interceptors.request.use(
  (config) => {
    const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem() ? JSON.parse(getItem() as string) : null;
    console.log("accessToken", accessToken);
    //accessToken이 존재하면 Authorization헤더에 Bearer 토큰 형식으로 추가함.
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("config.headaers", config.headers);
    }

    //수정된 요청 설정을 반환함.
    return config;
  },
  //요청 인터셉터가 실패하면, 에러를 반환함.
  (error) => Promise.reject(error),
);

//응답 인터셉터 401에러 발생 : -> refresh토큰을 통한 accessToken 재발급
axiosInstance.interceptors.response.use(
  (response) => response, //정상 응답 그대로 반환
  async (error) => {
    const originalRequest: CustomInternalAxiosReqeustConfig = error.config;

    //401에러면서, 아직 재시도 하지 않은 요청 처리
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.errorCode === "AUTH_001" && // 이렇게 에러코드가 custom된 경우에는 그에 따른 과정을 해결해줘야 함.
      !originalRequest._retry
    ) {
      //refresh 엔드포인트 401에러가 발생한 경우 (Unauthorization), 중복 재시도 방지를 위해 로그아웃 처리
      if (originalRequest.url === "/v1/auth/refresh") {
        const { removeItem: removeAccessToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.accessToken,
        );
        const { removeItem: removeRefreshToken } = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken,
        );

        removeAccessToken();
        removeRefreshToken();

        window.location.href = "/login"; // 로그인을 다시 해야하므로 로그인 페이지로 이동시킴
        return Promise.reject(error);
      }

      //재시도 플래그 설정
      originalRequest._retry = true;

      //이미 refresh 요청이 진행중이라면, 그 Promise를 재사용함.
      if (!refreshPromise) {
        //refresh요청 실행 후, 프라미스를 전역 변수에 할당함.
        refreshPromise = (async () => {
          const { getItem: getRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken,
          );

          const refreshToken = getRefreshToken();

          const { data } = await axiosInstance.post("/v1/auth/refresh", {
            refresh: refreshToken,
          });
          //여기서 refresh를 통해서 새 accessToken이 발급 됨.

          const { setItem: setAccessToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.accessToken,
          );
          const { setItem: setRefreshToken } = useLocalStorage(
            LOCAL_STORAGE_KEY.refreshToken,
          );

          setAccessToken(data.data.accessToken);
          setRefreshToken(data.data.refreshToken);

          //new accessToken을 반환하여 다른 요청들이 이것을 사용할 수 있게함.
          return data.data.acessToken;
        })()
          .catch((error) => {
            const { removeItem: removeAccessToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.accessToken,
            );
            const { removeItem: removeRefreshToken } = useLocalStorage(
              LOCAL_STORAGE_KEY.refreshToken,
            );

            removeAccessToken();
            removeRefreshToken();
          })
          .finally(() => {
            refreshPromise = null;
          });
      }
      //진행중인 refreshPromise가 해결될 떄까지 기다림
      return refreshPromise.then((newAccessToken) => {
        //원본 요청의 Authorization 헤더를 갱신되 토큰으로 업뎃
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        //업데이트 된 원본 요청을 재시도 함.
        return axiosInstance(originalRequest);
      });
    }
  },
);
