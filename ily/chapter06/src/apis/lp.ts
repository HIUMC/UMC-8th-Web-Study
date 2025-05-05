import { PaginationDto } from "../utils/types/common";
import { ResponseLpListDto } from "../utils/types/lp";
import { axiosInstance } from "./axios";

export const getLpList = async (
  PaginationDto: PaginationDto,
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get(`/v1/lps`, {
    params: PaginationDto,
  });

  return data;
};
