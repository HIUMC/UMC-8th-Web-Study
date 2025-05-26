import { commonResponse, CursorBasedResponse, PageinationDto } from "./common";

export type Tag = {
  id: number;
  name: string;
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

// *********************** LP 좋아요 관련 ***************** //

// LP 좋아요 ResponseDto
export type ResponseLikeLpDto = commonResponse<{
  id: number;
  userId: number;
  lpId: number;
}>;

export type Likes = {
  id: number;
  userId: number;
  lpId: number;
};

// *********************** LP 목록 조회 RequestDto *************** //

// LP 상세 조회 타입
export type RequestLpDto = {
  lpId: number;
};

// LP 상세 조회 타입
export type ResponseLpDto = commonResponse<Lp>;

// 특정 태그 관련 LP 조회 RequestDto
export type RequestTagLpListDto = PageinationDto & {
  tagNmae: string;
};

// *********************** LP 생성 관련 *********************** //
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
