import axiosInstance from '../lib/axiosInstance';
import { LP, LPDetailResponse, LPListResponse, PaginationDto } from '../types/lp';

export const getLPList = async (params: PaginationDto = {}): Promise<LPListResponse> => {
  const { data } = await axiosInstance.get<LPListResponse>('/v1/lps', { params });
  return data;
};

export const getLPDetail = async (lpId: string): Promise<LP> => {
  const response = await axiosInstance.get<LPDetailResponse>(`/v1/lps/${lpId}`);
  console.log('LP 상세 API 응답:', response.data);
  const lpData = response.data.data;
  console.log('LP 데이터:', lpData);
  return lpData;
};
