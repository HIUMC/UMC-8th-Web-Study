import { PaginationDto } from '../types/common';
import { axiosInstance } from './axios';
import {
  RequestAddLpDto,
  RequestLpDetailsDto,
  ResponseAddLpDto,
  ResponseCommentListDto,
  ResponseLikeLpDto,
  ResponseLpDetailsDto,
  ResponseLpListDto,
  RequestAddCommentDto,
  RequestUpdateCommentDto,
  ResponseAddCommentDto,
  ResponseUpdateCommentDto,
  ResponseDeleteCommentDto,
  ResponseMyLpListDto,
  LpPaginationDto,
} from '../types/lp';

export const getLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get('/v1/lps', {
    params: paginationDto,
  });
  return data;
};

export const getLpDetails = async ({
  lpId,
}: RequestLpDetailsDto): Promise<ResponseLpDetailsDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

export const getCommentList = async ({
  lpId,
  cursor,
  limit,
  order,
}: LpPaginationDto): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: {
      cursor,
      limit,
      order,
    },
  });
  return data;
};

export const postLike = async ({
  lpId,
}: RequestLpDetailsDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

export const deleteLike = async ({
  lpId,
}: RequestLpDetailsDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};

export const addLp = async (
  body: RequestAddLpDto
): Promise<ResponseAddLpDto> => {
  const { data } = await axiosInstance.post('/v1/lps', body);
  return data;
};

export const addComment = async ({
  lpId,
  body,
}: {
  lpId: number;
  body: RequestAddCommentDto;
}): Promise<ResponseAddCommentDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, body);
  return data;
};

export const updateComment = async ({
  lpId,
  commentId,
  body,
}: {
  lpId: number;
  commentId: number;
  body: RequestUpdateCommentDto;
}): Promise<ResponseUpdateCommentDto> => {
  const { data } = await axiosInstance.patch(
    `/v1/lps/${lpId}/comments/${commentId}`,
    body
  );
  return data;
};

export const deleteComment = async ({
  lpId,
  commentId,
}: {
  lpId: number;
  commentId: number;
}): Promise<ResponseDeleteCommentDto> => {
  const { data } = await axiosInstance.delete(
    `/v1/lps/${lpId}/comments/${commentId}`
  );
  return data;
};

export const getMyLpList = async (
  paginationDto: PaginationDto
): Promise<ResponseMyLpListDto> => {
  const { data } = await axiosInstance.get('/v1/lps/user', {
    params: paginationDto,
  });
  return data;
};
