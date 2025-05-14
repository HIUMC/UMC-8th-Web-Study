import { ResponseLpListDto } from "../types/lp";
import { axiosInstance } from "./axios";
import { PageinationDto } from "../types/common";

export const getLpList = async (
  paginationDto: PageinationDto
): Promise<ResponseLpListDto> => {
  const { data } = await axiosInstance.get("/v1/lps", {
    params: paginationDto,
  });
  return data;
};
