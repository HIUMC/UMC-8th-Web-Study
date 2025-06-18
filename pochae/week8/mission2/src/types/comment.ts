import { CommonResponse } from "./common";

export type RequestCommentDto = {
    lpId: number
    content: string;
}

export type ResponseCommentDto = CommonResponse<{
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
}>