import { commonResponse, PageinationDto } from "./common";

// 댓글 작성자 타입
export type CommentAuthor = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

// 댓글 타입
export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: CommentAuthor;
};

// 댓글 생성 RequestDto
export type RequestCreateCommentDto = {
  lpId: number;
};

// 댓글 생성 ResponseDto
// 묶는 것 좀 생각해봐야될ㄷ ㅡㅅ
export type ResponseCreateCommentDto = commonResponse<{
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
}>;

// 댓글 목록 조회 RequestDto
export type RequestCommentListDto = PageinationDto & {
  lpId: number; // 필수
};

// 댓글 목록 조회 ResponseDto
export type ResponseCommentListDto = commonResponse<{
  data: Comment[];
  nextCursor: number | null;
  hasNext: boolean;
}>;
