import { axiosInstance } from "./axios";
import {
  RequestCommentListDto,
  RequestCreateCommentDto,
  ResponseCommentListDto,
  ResponseCreateCommentDto,
} from "../types/comment";

// 댓글 목록 조회 API
export const getCommentList = async (
  requestCommentListDto: RequestCommentListDto
): Promise<ResponseCommentListDto> => {
  const { data } = await axiosInstance.get(
    `/v1/lps/${requestCommentListDto.lpId}/comments`,
    {
      params: {
        cursor: requestCommentListDto.cursor,
        limit: requestCommentListDto.limit,
        order: requestCommentListDto.order,
      },
    }
  );
  return data;
};

// 댓글 생성 API
export const postCreateComment = async (
  requestCreateCommentDto: RequestCreateCommentDto
): Promise<ResponseCreateCommentDto> => {
  console.log("댓글 생성 요청 데이터:", requestCreateCommentDto);
  const { data } = await axiosInstance.post(
    `/v1/lps/${requestCreateCommentDto.lpId}/comments`
  );
  console.log("댓글 생성 응답 데이터:", data);
  return data;
};
