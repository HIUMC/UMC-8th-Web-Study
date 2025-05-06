import { commonResponse } from "./common";

//회원가입
export type ResponseSignupDto = {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    password: string;
}

export type RequestSignupDto = {
    name: string;
    email: string;
    password: string;
}

//로그인
export type RequestSigninDto = {
    email: string;
    password: string;
}
export type ResponseSigninDto = commonResponse<{
    id: string;
    name: string;
    accessToken: string;
    refreshToken: string;
}>

//내정보조회
export type ResponseMyInfoDto = commonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string|null;
    avatar: string|null;
    createdAt: Date;
    updatedAt: Date;
}>