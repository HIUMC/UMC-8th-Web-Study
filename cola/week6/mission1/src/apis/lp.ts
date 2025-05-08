import { PaginationDto } from "../types/common";
import { axiosInstance } from "./axios";
import { ResponseLpDetailsDto, ResponseLpListDto } from "../types/lp";

export const getLpList = async (paginationDto: PaginationDto):Promise<ResponseLpListDto> =>{
    const {data} = await axiosInstance.get('/v1/lps', {
        params: paginationDto
    })
    return data;
}

export const getLpDetails = async (lpId: number):Promise<ResponseLpDetailsDto> => {
    const { data } = await axiosInstance.get(`/v1/lps/${lpId}`);
    return data;
}
