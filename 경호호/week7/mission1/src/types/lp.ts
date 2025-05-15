export enum PaginationOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export interface PaginationDto {
  cursor?: string;
  limit?: number;
  search?: string;
  order?: PaginationOrder;
}

export interface LP {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  thumbnail?: string;
  tags: Tag[];
  likes: Like[];
  user: {
    id: string;
    nickname: string;
    profileImage?: string;
  };
}

export interface Tag {
  id: string;
  name: string;
}

export interface Like {
  id: string;
  userId: string;
}

export interface CursorBasedResponse<T> {
  data: T[];
  nextCursor: string | null;
  hasNext: boolean;
}

export interface ApiResponse<T> {
  status: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export type LPListResponse = ApiResponse<CursorBasedResponse<LP>>;
export type LPDetailResponse = ApiResponse<LP>;

export interface LPCreateDto {
  title: string;
  content: string;
  tags?: string[];
}
