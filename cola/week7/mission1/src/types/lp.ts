import { CommonResponse, CursorBasedResponse } from './common';

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

export type Author = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Lp = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
};

export type ResponseLpListDto = CursorBasedResponse<Lp[]>;

export type RequestLpDetailsDto = {
  lpId: number;
};

export type ResponseLpDetailsDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  likes: Likes[];
  author: Author;
}>;

export type Comment = {
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};

export type ResponseCommentListDto = CursorBasedResponse<Comment[]>;

export type RequestCommentListDto = {
  lpId: number;
  cursor: number | null;
  limit: number | null;
  order: string | null;
};

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type RequestAddLpDto = {
  title: string;
  content: string;
  thumbnail?: string;
  tags: string[];
  published: boolean;
};

export type ResponseAddLpDto = CommonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}>;

export type RequestAddCommentDto = {
  content: string;
};

export type ResponseAddCommentDto = Comment;

export type RequestUpdateCommentDto = RequestAddCommentDto;

export type ResponseUpdateCommentDto = CommonResponse<{
  id: number;
  content: string;
  lpId: number;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
}>;

export type ResponseDeleteCommentDto = CommonResponse<{
  meassage: string;
}>;

export type ResponseMyLpListDto = CursorBasedResponse<Lp[]>;
