export interface CommonResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}

export type { CommonResponse as commonResponse };

export type CommonResponseList<T> = CommonResponse<{
    data: T;
    nextCursor: number | null;
    hasNext: boolean;
}>

export enum PAGINATION_ORDER {
    ASC = 'ASC',
    DESC = 'DESC'
}

export type PaginationDto = {
    cursor?: number;
    limit?: number;
    search?: string;
    order?: PAGINATION_ORDER;
};