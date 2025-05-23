import { CommonResponse } from "./common";

export interface RequestSigninDto {
    email: string;
    password: string;
}

export interface ResponseSigninDto {
    accessToken: string;
    refreshToken: string;
}

export interface RequestSignupDto {
    name: string;
    email: string;
    password: string;
    bio?: string;
    avatar?: string;
}

export interface ResponseSignupDto {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}

export type ResponseMyInfoDto = CommonResponse<{
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;