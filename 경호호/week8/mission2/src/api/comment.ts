import axiosInstance from '../lib/axiosInstance';
import { CommentPaginationDto } from '../types/comment';

export const getCommentList = async (params: CommentPaginationDto) => {
  const { lpId, cursor = 0, limit = 10, order = 'desc' } = params;

  try {
    const response = await axiosInstance.get(`/v1/lps/${lpId}/comments`, {
      params: {
        cursor,
        limit,
        order
      }
    });
    
    console.log('댓글 API 원본 응답:', response);
    return response.data;
  } catch (error) {
    console.error('댓글 목록 조회 오류:', error);
    throw error;
  }
};

export interface CreateCommentDto {
  content: string;
}

export interface UpdateCommentDto {
  content: string;
}

export const createComment = async (lpId: string, data: CreateCommentDto) => {
  const response = await axiosInstance.post(`/v1/lps/${lpId}/comments`, data);
  return response.data;
};

export const updateComment = async (lpId: string, commentId: number, data: UpdateCommentDto) => {
  const response = await axiosInstance.patch(`/v1/lps/${lpId}/comments/${commentId}`, data);
  return response.data;
};

export const deleteComment = async (lpId: string, commentId: number) => {
  const response = await axiosInstance.delete(`/v1/lps/${lpId}/comments/${commentId}`);
  return response.data;
};
