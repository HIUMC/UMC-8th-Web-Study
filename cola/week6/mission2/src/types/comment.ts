import { Author } from "./lp"
import { CursorBasedResponse } from "./common"

export type Comment = {
    id: number,
    content: string,
    lpId: number
    authorId: number,
    createdAt: Date,
    updatedAt: Date,
    author: Author
}

export type ResponseCommentListDto = CursorBasedResponse<Comment[]>;

export type RequestCommentListDto = {
    lpId: number,
    cursor: number | null,
    limit: number | null,
    order: string | null,
}