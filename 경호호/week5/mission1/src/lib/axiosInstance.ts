import axios from 'axios';

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
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        try {
          const token = JSON.parse(accessToken);
          config.headers.Authorization = `Bearer ${token}`;
        } catch (error) {
          console.error('토큰 파싱 오류:', error);
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshTokenStr = localStorage.getItem('refreshToken');
        if (!refreshTokenStr) {
          window.location.href = '/signin';
          return Promise.reject(error);
        }
        
        const refreshToken = JSON.parse(refreshTokenStr);
        
        const response = await axios.post('http://localhost:8000/v1/auth/refresh', { 
          refreshToken 
        });
        
        const { accessToken: newAccessToken } = response.data;
        
        localStorage.setItem('accessToken', JSON.stringify(newAccessToken));
        
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        
        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
