import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // 프록시 경로 설정
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: 로컬 스토리지에서 토큰을 가져와 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // 브라우저 환경에서만 로컬 스토리지 접근
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('accessToken'); // mission2에서는 accessToken만 사용 가정
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (기본 설정)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // TODO: 필요시 리프레시 토큰 로직 등 추가
    return Promise.reject(error);
  }
);

export default axiosInstance;
