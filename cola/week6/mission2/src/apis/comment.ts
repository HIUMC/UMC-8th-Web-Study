import { RequestCommentListDto, ResponseCommentListDto } from "../types/comment";
import { axiosInstance } from "./axios";

export const getCommentList = async ({lpId}:RequestCommentListDto):Promise<ResponseCommentListDto> => {
    const {data} = await axiosInstance.get(`/v1/lps/${lpId}/comments`,{
        params: {
            cursor: null,
            limit: null,
            order: null
        }
    })
    return data;
}