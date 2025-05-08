import { CommonResponse, CursorBasedResponse } from "./common";

export type ResponseLpListDto = CursorBasedResponse<LP[]>;

export type LP = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: TAGS[];
  likes: LIKES[];
};

export type LPwithAUTHOR = {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  tags: TAGS[];
  likes: LIKES[];
  author: AUTHOR;
};
export type TAGS = {
  id: number;
  name: string;
};

export type LIKES = {
  id: number;
  userId: number;
  lpId: number;
};

export type LPDETAILLIST = {
  status: boolean;
  statusCode: number;
  message: string;
  data: LPwithAUTHOR;
};

export type AUTHOR = {
  id: number;
  name: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type RequestLpDto = {
  lpId: number;
};

export type ResponseLikeLpDto = CommonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type RequestAddLpDto = {
  title: string;
  content: string;
  thumbnail: string | null;
  tags: string[] | null;
  published: true;
};
