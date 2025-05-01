import { CommonResponse } from "./common";
//회원가입입
export type RequestSignupDto = {
    name: string;
    email: string;
    bio? : string;
    avatar? : string;
    password: string;
};

export type ResponsesignupDto = CommonResponse <{
    id: number;
    name: string;
    email: string;
    bio: string|null;
    avatar: string | null;
    createAt: Date;
    updateAt: Date;
}>;

//로그인
export type RequestSigninDto = {
    email: string;
    password: string;
}
export type ResponseSigninDto = CommonResponse<{
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
}>

//내 정보조회
export type ResponseMyInfoDto = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string|null;
    avatar: string | null;
    createAt: Date;
    updateAt: Date;
}>;