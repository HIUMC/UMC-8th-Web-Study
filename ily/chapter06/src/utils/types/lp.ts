import { CursorBasedResponse } from "./common";

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

export type TAGS = {
  id: number;
  name: string;
};

export type LIKES = {
  id: number;
  userId: number;
  lpId: number;
};
