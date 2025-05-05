import { PaginationDto } from "../types/common";
import { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  PaginationDto: PaginationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps/", {
    params: PaginationDto,
  });

  return data;
};
