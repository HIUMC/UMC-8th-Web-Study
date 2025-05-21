import axios from 'axios';

export interface CommentItem {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface CommentListResponse {
  data: CommentItem[];
  nextCursor: number | null;
  hasNext: boolean;
}

interface FetchCommentParams {
  lpId: number;
  cursor?: number;
  limit?: number;
  order?: 'asc' | 'desc';
}

export const fetchComments = async ({
  lpId,
  cursor,
  limit = 10,
  order = 'asc',
}: FetchCommentParams): Promise<CommentListResponse> => {
  const base = import.meta.env.VITE_SERVER_URL!;
  const accesstoken = localStorage.getItem('accessToken');
  const res = await axios.get(
    `${base}/v1/lps/${lpId}/comments`,
    {
      params: { cursor, limit, order },
      headers: {
        // Authorization 헤더에 Bearer 토큰을 포함
        Authorization: accesstoken ? `Bearer ${accesstoken}` : undefined,
      },
    }
  );
  // Swagger: res.data.data.data 에 댓글 배열, nextCursor, hasNext
  const {
    data: {
      data: list,
      nextCursor,
      hasNext,
    },
  } = res.data;
  return { data: list, nextCursor, hasNext };
};