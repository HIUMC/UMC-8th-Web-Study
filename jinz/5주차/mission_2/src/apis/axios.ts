import axios, { AxiosInstance } from "axios";

export const axiosInstance : AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SEVER_API_URL,
})

export const refreshInstance = axios.create({
    baseURL: import.meta.env.VITE_SEVER_API_URL,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        console.log('❗ 인터셉터 진입, 응답 상태:', error.response?.status);

        //오류 발생시시
        if ( error.response.status === 401 && !originalRequest._retry) { 
            originalRequest._retry=true; //한 번만 재시도

            try { //refresh 토큰을 통해 다시 데이터 받아옴옴
                console.log('401감지, refresh 시도도')
                const refreshToken = localStorage.getItem('refreshToken');
                const {data} = await refreshInstance.post('/v1/auth/refresh',{
                    refreshToken,
                })
                
                const newAccessToken = data.accessToken;
                console.log("refresh 성공공: ", newAccessToken)

                localStorage.setItem('accessToken',newAccessToken);
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error("refresh error: ", refreshError);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);

            }
        }

        return Promise.reject(error);
    }
)

