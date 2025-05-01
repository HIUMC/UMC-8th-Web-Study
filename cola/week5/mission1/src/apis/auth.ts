import {
  RequestSignInDto,
  RequestSignUpDto,
  ResponseSignInDto,
  ResponseMyInfoDto,
  ResponseSignUpDto,
} from '../types/auth';
import { CommonResponse } from '../types/common';
import { axiosInstance } from './axios';

export const postSignUp = async (
  body: RequestSignUpDto
): Promise<ResponseSignUpDto> => {
  const { data } = await axiosInstance.post('/v1/auth/signup', body);
  return data;
};

export const postSignIn = async (
  body: RequestSignInDto
): Promise<ResponseSignInDto> => {
  const { data } = await axiosInstance.post('/v1/auth/signin', body);
  return data;
};

export const getMyInfo = async (): Promise<ResponseMyInfoDto> => {
  const { data } = await axiosInstance.get('/v1/users/me');
  return data;
};

export const getProtected = async (): Promise<
  CommonResponse<string | null>
> => {
  const { data } = await axiosInstance.get('/v1/auth/protected');
  return data;
};

export const postLogOut = async () => {
  const { data } = await axiosInstance.post('/v1/auth/signout');
  return data;
};
