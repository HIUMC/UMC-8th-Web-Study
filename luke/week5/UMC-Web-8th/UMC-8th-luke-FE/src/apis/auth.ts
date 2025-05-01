import { axiosInstance } from "./axios";
import {
  RequestLoginDto,
  RequestSignupDto,
  ResponseSignupDto,
  ResponseLoginDto,
  ResponseMyInfoDto,
  ResponseRefreshDto,
} from "../types/auth";
import { LocalStorageKey } from "../constants/key";

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);
  return data;
};

export const postLogin = async (body: RequestLoginDto): Promise<ResponseLoginDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const token = localStorage.getItem("accessToken")?.replace(/"/g, "");
  const { data } = await axiosInstance.get("/v1/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export const postLogout = async (): Promise<void> => {
  await axiosInstance.post(
    "/v1/auth/signout",
    {},
    { withCredentials: true }
  );
};

export const refreshAccessToken = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  // 1) 로컬에서 Refresh Token 꺼내기
  console.log("토큰 재발급 응답!");
  const refresh = localStorage.getItem(LocalStorageKey.refreshToken);
  if (!refresh) throw new Error("No refresh token available");

  // 2) POST /v1/auth/refresh { refresh }
  const response = await axiosInstance.post<ResponseRefreshDto>(
    "/v1/auth/refresh",
    { refresh }
  );
  
  // 3) 새로운 Access/Refresh Token 저장
  const { accessToken, refreshToken } = response.data.data;
  localStorage.setItem(LocalStorageKey.accessToken, accessToken);
  localStorage.setItem(LocalStorageKey.refreshToken, refreshToken);

  // 4) 새 토큰 반환
  return { accessToken, refreshToken };
};
