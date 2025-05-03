import axios, { AxiosInstance } from "axios";

export const axiosInstance : AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SEVER_API_URL,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        console.log('Raw token from localStorage:', token);
        if(token && config.headers){
            // 토큰 앞뒤 공백 제거
            const trimmedToken = token.trim();
            console.log('Trimmed token:', trimmedToken);
            config.headers.Authorization = `Bearer ${trimmedToken}`;
            console.log('Final Authorization header:', config.headers.Authorization);
        }
        return config;
    }, (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
)
