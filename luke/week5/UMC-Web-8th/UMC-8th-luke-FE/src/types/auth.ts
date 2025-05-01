
import { CommonResponse } from "./common";


export type RequestSignupDto = {
  email: string;  
  password: string;
  bio?: string;
  avatar?: string;
  name: string;
};

export type ResponseSignupDto = CommonResponse<{
  id : number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;

export type RequestLoginDto = {
  email: string;
  password: string;
};

export type ResponseLoginDto = CommonResponse<{
  id: number;
  name: string;
  accessToken: string;
  refreshToken: string;
}>;

// 정보조회
export type ResponseMyInfoDto = CommonResponse<{
  id : number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
}>;


export type ResponseRefreshDto  = CommonResponse<{
  statusCode: number;
  message: string;
  data: {
    id: number;
    name: string;
    accessToken: string;
    refreshToken: string;
  };
}>;