import { PAGINATION_ORDER } from "../enums/commons";

export type commonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

// LP RequestDto
export type PageinationDto = {
  // 필수 없음 모두 optional
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER; // enum 타입(ASC, DESC)
};

// LP 목록조회 response
export type CursorBasedResponse<T> = commonResponse<{
  data: T;
  nextCursor: number | null;
  hasNext: boolean;
}>;
