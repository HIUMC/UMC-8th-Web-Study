import { PaginationDto } from '../types/common';
import { axiosInstance } from './axios';
import {
  RequestAddLpDto,
  RequestCommentListDto,
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
}: RequestCommentListDto): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
    params: {
      cursor: null,
      limit: null,
      order: null,
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
