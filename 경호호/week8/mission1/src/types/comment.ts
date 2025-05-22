import { PaginationOrder } from './lp';

export interface Comment {
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

export interface CommentPaginationDto {
  cursor?: string;
  limit?: number;
  lpId: string;
  order?: PaginationOrder;
}

export interface CommentResponse {
  data: Comment[];
  nextCursor: string | null;
  hasNext: boolean;
}
