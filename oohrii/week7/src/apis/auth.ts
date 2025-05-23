import { RequestSigninDto, RequestSignupDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth";
import axios from 'axios';
import { LOCAL_STORAGE_KEY } from "../constants/key";

const BASE_URL = 'http://localhost:3000/api';

// axios 인스턴스 생성
export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signup", body);
    return data;
};

export const postSignin = async (signinData: RequestSigninDto): Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post<ResponseSigninDto>("/v1/auth/signin", signinData);
    return data;
};

export const getMyInfo = async(): Promise<ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get("/v1/users/me");
    return data;
};

export const postLogout = async () => {
    const { data } = await axiosInstance.post("/v1/auth/signout");
    return data;
};