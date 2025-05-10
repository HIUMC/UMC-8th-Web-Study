import { PAGINATION_ORDER } from "../enums/common";

export type commonResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
};

export type CursorBasedResponse<T> = {
    status: boolean;
    statusCode: number;
    message: string;
    data: T;
    nextCursor: number;
    hasNext: boolean;
};

export type PaginationDto = {   // optional 이니까 ?: 사용
    cursor?: number;
    limit?: number;
    search?: string;
    order?: PAGINATION_ORDER;
};
