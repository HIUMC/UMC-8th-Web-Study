import axios, { InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean; // 요청 재시도 여부
}

//전역 변수로 refresh 요청의 Promise를 저장해서 중복 요청을 방지함.
let refreshPromise:Promise <string> | null = null;

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// 요청 인터셉터: 모든 요청 전에 accessToken을 Authorization 헤더에 추가
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const {getItem} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
    const accessToken = getItem(); // localStorage에서 accessTOken을 가져옴.

    // accessToken이 있으면 Authorization 헤더에 Bearer 토큰 형식으로 추가
    if(accessToken){
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    // 수정된 설정 요청을 반환
    return config;
  },
  //요청 인터셉터가 실패하면, 오류 반환
  (error) => Promise.reject(error),
);

//응답 인터셉터: 401에러 발생 -> refresh 토큰을 통한 토큰 갱신을 처리
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
  const originalRequest:CustomAxiosRequestConfig = error.config;

  // 401에러면서, 아직 재시도 하지 않은 요청을 처리
  if(
    error.response &&
    error.response.status === 401 &&
    !originalRequest._retry
  ) {
    // refresh 엔드포인트 401 에러가 발생한 경우 (Unauthorized), 중복 재시도 방지를 위해 로그아웃 처리.
    if(originalRequest.url === '/auth/refresh'){
      const {removeItem: removeAccessToken} = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
      const {removeItem: removeRefreshToken} = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
      removeAccessToken();
      removeRefreshToken();
      window.location.href = '/login';
      return Promise.reject(error);
    }
    
    // 재시도 플래그 설정
    originalRequest._retry = true;

    // 이미 refresh 요청이 진행중이면, 그 Promise를 재사용함
    if(!refreshPromise){
      // refresh 요청 실행 후, Promise를 전역 변수에 할당
      refreshPromise = (async() => {
        const {getItem:getRefreshToken} = useLocalStorage(
          LOCAL_STORAGE_KEY.refreshToken
        );
        const refreshToken = getRefreshToken();
        // 로컬 스토리지에서 가져온 refresh 토큰이 제대로 있는지 확인
        console.log('Refresh token from storage:', refreshToken);

        const {data} = await axiosInstance.post('/v1/auth/refresh', {
          refresh: refreshToken,
        });
        // 백엔드에서 받은 refresh 응답 데이터의 구조 확인
        console.log('Refresh response data:', data);
      
      //새 토큰이 반환
      const{setItem:setAccessToken} = useLocalStorage(
        LOCAL_STORAGE_KEY.accessToken
      );
      const {setItem:setRefreshToken} = useLocalStorage(
        LOCAL_STORAGE_KEY.refreshToken
      );
      setAccessToken(data.data.accessToken);
      setRefreshToken(data.data.refreshToken);
      // 새로 설정된 토큰들이 제대로 저장되었는지 확인
      console.log('New tokens set:', {
        accessToken: data.data.accessToken,
        refreshToken: data.data.refreshToken
      });

      //새 accessToken을 반환하여 다른 요청들이 이것을 사용할 수 있게 함.
      return data.data.accessToken;
    })()
    .catch((error) => {
      // refresh 토큰 요청이 실패했을 때 에러 내용 확인
      console.error('Refresh token error:', error);
      const{removeItem:removeAccessToken} = useLocalStorage(
        LOCAL_STORAGE_KEY.accessToken
      );
      const{removeItem:removeRefreshToken} = useLocalStorage(
        LOCAL_STORAGE_KEY.refreshToken
      ); 
      removeAccessToken();
      removeRefreshToken();
      window.location.href = '/login';
      return Promise.reject(error);
    })
    .finally(() =>{
      refreshPromise = null;
    });
  }

  // 진행중인 refreshPromise가 해결될 때까지 기다림
  return refreshPromise.then((newAccessToken) => {
    // 재시도할 때 사용되는 새 access 토큰이 제대로 전달되는지 확인
    console.log('Retrying request with new token:', newAccessToken);
    //원본 요청의 Authorization 헤더를 갱신된 토큰으로 업데이트
    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
    
    // 업데이트된 원본 요청을 재시도함
    return axiosInstance.request(originalRequest);
  });
  }

  //401에러가 아닌 경우에 그대로 오류를 반환
  return Promise.reject(error);
  }
);
