import axios from 'axios';
import { CommentPaginationDto } from '../types/comment';
import { API_BASE_URL } from '../constants/api';

// 댓글 목록 조회 API
export const getCommentList = async (params: CommentPaginationDto) => {
  const { lpId, cursor = 0, limit = 10, order = 'desc' } = params;

  try {
    const response = await axios.get(`${API_BASE_URL}/lp/${lpId}/comments`, {
      params: {
        cursor,
        limit,
        order
      }
    });
    
    return response;
  } catch (error) {
    console.error('댓글 목록 조회 오류:', error);
    throw error;
  }
};

// 댓글 작성 API (구현 예정)
export const createComment = async (lpId: string, content: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/comment`, {
      lpId,
      content
    });
    
    return response;
  } catch (error) {
    console.error('댓글 작성 오류:', error);
    throw error;
  }
};
