import axios, { AxiosInstance } from "axios";

export const axiosInstance : AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SEVER_API_URL,
})
