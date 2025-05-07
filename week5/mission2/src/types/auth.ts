import { commonResponse } from "./common";


export type ResponseSignupDto = {
    name: string;
    email: string;
    bio?: string;
    avatar?: string;
    password: string;
}


export type RequestSignupDto = commonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string|null;
    avatar: string|null;
    createdAt: Date;
    updatedAt: Date;
}>

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


export type ResponseMyInfoDto = commonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string|null;
    avatar: string|null;
    createdAt: Date;
    updatedAt: Date;
}>