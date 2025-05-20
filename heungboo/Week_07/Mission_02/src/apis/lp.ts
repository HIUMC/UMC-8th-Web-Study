import {
  RequestLpDto,
  RequestPostLpDto,
  RequestTagLpListDto,
  ResponseLikeLpDto,
  ResponseLpDto,
  ResponseLpListDto,
  ResponsePostLpDto,
} from "../types/lp";
import { axiosInstance } from "./axios";
import { PageinationDto } from "../types/common";

// LP 목록 조회
export const getLpList = async (
  paginationDto: PageinationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
};

// LP 생성
export const postLpList = async (
  requestPostLpDto: RequestPostLpDto
): Promise<ResponsePostLpDto> => {
  const { data } = await axiosInstance.post("/v1/lps", {
    PostLp: requestPostLpDto,
  });
  return data;
};

// 내가 생성한 LP 목록 조회
export const getUserLpList = async (
  paginationDto: PageinationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps/user", {
    params: paginationDto,
  });
  return data;
};

// LP 상세 조회
export const getLpDetail = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
};

// LP 삭제
export const deleteLp = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLpDto> => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);

  return data;
};

// 게시글 좋아요
export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  return data;
};

// 게시글 좋아요 취소
export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  return data;
};

// 특정 태그 관련 LP 목록 조회
export const getTagLpList = async (
  tagName: RequestTagLpListDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/tag/${tagName}`, {});
  return data;
};
