import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void }[] = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const rawToken = localStorage.getItem('accessToken');
      if (rawToken && rawToken !== 'undefined' && rawToken !== 'null') {
        try {
          const token = JSON.parse(rawToken);
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        } catch (err) {
          console.error('액세스 토큰 파싱 오류:', err);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.response) {
        console.error("네트워크 오류 또는 서버 응답 없음:", error);
        return Promise.reject(error);
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const status = error.response.status;

    if (status === 401 && !originalRequest._retry && originalRequest.url !== '/v1/auth/refresh') {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            if (originalRequest.headers) {
              originalRequest.headers['Authorization'] = 'Bearer ' + token;
            }
            return axiosInstance(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const rawRefreshToken = localStorage.getItem('refreshToken');
        if (!rawRefreshToken || rawRefreshToken === 'undefined' || rawRefreshToken === 'null') {
           throw new Error('리프레시 토큰 없음');
        }
        const refreshToken = JSON.parse(rawRefreshToken);

        const { data } = await axiosInstance.post('/v1/auth/refresh', { refreshToken });
        
        const responseData = data as { data?: { accessToken?: string } };
        const newAccessToken = responseData.data?.accessToken;

        if (!newAccessToken) {
          throw new Error('새 액세스 토큰을 받지 못했습니다.');
        }

        localStorage.setItem('accessToken', JSON.stringify(newAccessToken));

        if (axiosInstance.defaults.headers.common) {
          axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        }

        if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        }

        processQueue(null, newAccessToken);

        return axiosInstance(originalRequest);

      } catch (refreshError: any) {
        console.error('토큰 갱신 실패:', refreshError);
        processQueue(refreshError as AxiosError, null);

        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        if (typeof window !== 'undefined') {
           console.log("로그인 페이지로 이동 필요");
        }

        const enhancedError = refreshError instanceof Error ? refreshError : new Error('토큰 갱신 중 알 수 없는 오류 발생');
        return Promise.reject(enhancedError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
