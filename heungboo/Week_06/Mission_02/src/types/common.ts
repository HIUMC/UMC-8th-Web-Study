import { PAGINATION_ORDER } from "../enums/commons";

export type commonResponse<T> = {
  status: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type CursorBasedResponse<T> = commonResponse<{
  data: T;
  nextCursor: number | null;
  hasNext: boolean;
}>;

// 보낼 때 사용하는 거
export type PageinationDto = {
  // 필수 없음 모두 optional
  cursor?: number;
  limit?: number;
  search?: string;
  order?: PAGINATION_ORDER;
};
