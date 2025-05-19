import {
  RequestPatchUserInfoDto,
  RequestSigninDto,
  RequestSignupDto,
  ResponseMyInfoDto,
  ResponseSigninDto,
  ResponseSignoutDto,
  ResponseSignupDto,
} from "../types/auth";
import { axiosInstance } from "./axios";

// 회원가입
export const postSignup = async (
  body: RequestSignupDto
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);

  return data;
};

// 로그인
export const postSignin = async (
  body: RequestSigninDto
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);

  return data;
};

// 내 정보 조회
export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get("/v1/users/me");

  return data;
};

// 로그아웃
export const postLogout = async (): Promise<ResponseSignoutDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signout");

  return data;
};

// 유저 정보 수정 ( 일단 Promise 는 SignoutDto 와 같길래 통일함 .. 이름 바꿔야할듯 )
export const patchUserInfo = async (body: {
  body: RequestPatchUserInfoDto;
}): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.patch("/v1/users", body);
  return data;
};

// 회원 탈퇴
export const deleteUser = async (): Promise<void> => {
  await axiosInstance.delete("/v1/users");
};
