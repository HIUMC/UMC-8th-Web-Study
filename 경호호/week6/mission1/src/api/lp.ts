import axiosInstance from '../lib/axiosInstance';
import { LP, LPDetailResponse, LPListResponse, PaginationDto } from '../types/lp';

export const getLPList = async (params: PaginationDto = {}): Promise<LPListResponse> => {
  const { data } = await axiosInstance.get<LPListResponse>('/v1/lps', { params });
  return data;
};

export const getLPDetail = async (lpId: string): Promise<LP> => {
  const { data } = await axiosInstance.get<LPDetailResponse>(`/v1/lps/${lpId}`);
  return data;
};
