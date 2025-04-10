import { axiosInstance } from "./axios";
import {
  RequestLoginDto,
  RequestSignupDto,
  ResponseSignupDto,
  ResponseLoginDto,
  ResponseMyInfoDto,
} from "../types/auth";

export const postSignup = async (body: RequestSignupDto): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);
  return data;
};

export const postLogin = async (body: RequestLoginDto): Promise<ResponseLoginDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const token = localStorage.getItem("accessToken");
 
  if (!token){
    throw new Error("No access token found");
  }
  
  const { data } = await axiosInstance.get("/v1/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("??? ");
  return data;
};
