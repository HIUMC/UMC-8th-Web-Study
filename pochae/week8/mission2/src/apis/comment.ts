import { RequestCommentDto } from "../types/comment";
import { axiosInstance } from "./axios"

export const postComment = async ({lpId, content}: RequestCommentDto) => {
    const { data } = await axiosInstance.post(`/v1/lps/${lpId}/comments`, { content });

    return data;
}