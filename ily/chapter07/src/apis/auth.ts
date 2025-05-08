import {
  RequestSignupDto,
  RequestSigninDto,
  ResponseSignupDto,
  ResponseSigninDto,
  ResponseMyInfoDto,
} from "../utils/types/auth";
import { axiosInstance } from "../apis/axios.ts";
import { LOCAL_STORAGE_KEY } from "../constants/key.ts";

export const postSignup = async (
  body: RequestSignupDto,
): Promise<ResponseSignupDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signup", body);
  return data;
};

export const postSignin = async (
  body: RequestSigninDto,
): Promise<ResponseSigninDto> => {
  const { data } = await axiosInstance.post("/v1/auth/signin", body);
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  try {
    console.log("getmyinfo 실행");
    console.log(
      "accessToken in LocalStorage",
      localStorage.getItem("accessToken"),
    );
    console.log(
      "acessToken in LOCAL_STORAGE_KEY",
      localStorage.getItem(LOCAL_STORAGE_KEY.accessToken),
    );
    const { data } = await axiosInstance.get("/v1/users/me");

    console.log("api get호출 후");
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postSignout = async (): Promise<void> => {
  const { data } = await axiosInstance.post("/v1/auth/signout");
  return data;
};
