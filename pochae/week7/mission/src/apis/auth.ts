import { RequestMyDto, RequestSigninDto, RequestSignupDto, ResponseMyDto, ResponseMyInfoDto, ResponseSigninDto, ResponseSignupDto } from "../types/auth";
import { CommonResponse } from "../types/common";
import { axiosInstance } from "./axios";

export const postSignup = async (body: RequestSignupDto):Promise<ResponseSignupDto> => {
    const { data } = await axiosInstance.post('/v1/auth/signup', body);

    return data;
};

export const postSignin = async (body: RequestSigninDto):Promise<ResponseSigninDto> => {
    const { data } = await axiosInstance.post("/v1/auth/signin", body);

    return data;
};

export const getMyInfo = async():Promise<ResponseMyInfoDto> => {
    const {data} = await axiosInstance.get("/v1/users/me");

    return data;
};

export const postLogout = async() => {
    const { data } = await axiosInstance.post('v1/auth/signout');
    return data;
};

export const myFix = async({ name, bio, avatar }: RequestMyDto): Promise<ResponseMyDto> => {
    const { data } = await axiosInstance.patch(`/v1/users`, {
        name,
        bio,
        avatar
    });

    return data;
}

export const deleteMy = async(): Promise<CommonResponse<null>> => {
    const { data } = await axiosInstance.delete(`/v1/users`);
    return data;
};