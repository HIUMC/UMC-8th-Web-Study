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
