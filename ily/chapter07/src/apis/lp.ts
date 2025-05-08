import { PaginationDto } from "../utils/types/common";
import {
  RequestLpDto,
  ResponseLpListDto,
  ResponseLikeLpDto,
  RequestAddLpDto,
} from "../utils/types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  PaginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps`, {
    params: PaginationDto,
  });

  return data;
};

export const getLpDetail = async ({ lpId }: RequestLpDto) => {
  const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
  return data;
};

export const postLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.post(`/v1/lps/${lpId}/likes`);
  console.log(data);
  return data;
};

export const deleteLike = async ({
  lpId,
}: RequestLpDto): Promise<ResponseLikeLpDto> => {
  const { data } = await axiosInstance.delete(`/v1/lps/${lpId}/likes`);
  console.log(data);

  return data;
};

export const postAddLp = async ({
  title,
  content,
  thumbnail,
  tags,
  published,
}: RequestAddLpDto) => {
  console.log(
    "title:",
    title,
    "content :",
    content,
    "thumbnail:",
    thumbnail,
    "tags:",
    tags,
    "published:",
    published,
  );
  try {
    console.log(title, content, thumbnail, tags);
    const { data } = await axiosInstance.post("/v1/lps", {
      title,
      content,
      tags,
      thumbnail,
      published,
    });
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error adding LP:", error);
    console.log(title, content, thumbnail, tags);
  }
};
