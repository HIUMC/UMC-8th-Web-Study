import { CommonResponseDto } from "./common"

// 회원가입입
export type RequestSignupDto = {
  name: string,
  email: string,
  bio?: string,
  avatar?: string,
  password: string
}

export type ResponseSignupDto = CommonResponseDto<{
  id: number,
  name: string,
  email: string,
  bio: string | null,
  avatar: string | null,
  createdAt: Date,
  updatedAt: Date,
}>;

//로그인
export type RequestLoginDto = {
  email: string,
  password: string
}

export type ResponseLoginDto = CommonResponseDto<{
  id: number,
  name: string,
  accessToken: string,
  refreshToken: string
}>;

// 내 정보 조회
export type ResponseMyInfoDto = CommonResponseDto<{
  id: number,
  name: string,
  email: string,
  bio: string | null,
  avatar: string | null,
  createdAt: Date,
  updatedAt: Date,
}>;
