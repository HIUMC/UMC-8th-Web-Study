import { commonResponse, CursorBasedResponse, PageinationDto } from "./common";

export type Tag = {
  id: number;
  name: string;
};

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
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

export type RequestLpDto = {
  lpId: number;
};

export type ResponseLpDto = commonResponse<Lp>;

export type ResponseLikeLpDto = commonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

// 특정 태그 관련 LP 조회 RequestDto
export type RequestTagLpListDto = PageinationDto & {
  tagNmae: string;
};

// LP 생성 RequestDto
export type RequestPostLpDto = {
  title: string;
  content: string;
  thumbnail: string;
  tags: string[];
  published: boolean;
};

// LP 생성 ResponseDto
export type ResponsePostLpDto = commonResponse<{
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}>;
