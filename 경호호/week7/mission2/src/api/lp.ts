import axiosInstance from '../lib/axiosInstance';
import { LP, LPDetailResponse, LPListResponse, PaginationDto, LPCreateDto, LPUpdateDto } from '../types/lp';

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

export const createLP = async (lpData: LPCreateDto): Promise<LP> => {
  const response = await axiosInstance.post<LPDetailResponse>('/v1/lps', lpData);
  return response.data.data;
};

export const updateLP = async (lpId: string, lpData: LPUpdateDto): Promise<LP> => {
  const response = await axiosInstance.patch<LPDetailResponse>(`/v1/lps/${lpId}`, lpData);
  return response.data.data;
};

export const toggleLike = async (lpId: string): Promise<LP> => {
  try {
    // 좋아요 토글 API 호출
    const response = await axiosInstance.post<LPDetailResponse>(`/v1/lps/${lpId}/likes`);
    return response.data.data;
  } catch (error: any) {
    // 409 에러는 이미 좋아요가 되어 있는 상태 (POST 요청 시)
    if (error.response?.status === 409) {
      // 좋아요 취소 API 호출
      const response = await axiosInstance.delete<LPDetailResponse>(`/v1/lps/${lpId}/likes`);
      return response.data.data;
    }
    throw error;
  }
};

export const likeLP = async (lpId: string): Promise<LP> => {
  const response = await axiosInstance.post<LPDetailResponse>(`/v1/lps/${lpId}/likes`);
  return response.data.data;
};

export const unlikeLP = async (lpId: string): Promise<LP> => {
  const response = await axiosInstance.delete<LPDetailResponse>(`/v1/lps/${lpId}/likes`);
  return response.data.data;
};

export const deleteLP = async (lpId: string): Promise<void> => {
  await axiosInstance.delete<LPDetailResponse>(`/v1/lps/${lpId}`);
};
