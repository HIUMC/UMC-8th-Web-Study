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
    // 좋아요 시도
    const response = await axiosInstance.post<LPDetailResponse>(`/v1/lps/${lpId}/likes`);
    return response.data.data;
  } catch (error: any) {
    // 409 Conflict(이미 좋아요 상태)면 좋아요 취소 API 호출
    if (error.response && error.response.status === 409) {
      try {
        const response = await axiosInstance.delete<LPDetailResponse>(`/v1/lps/${lpId}/likes`);
        return response.data.data;
      } catch (deleteError) {
        console.error('좋아요 취소 중 오류:', deleteError);
        throw deleteError;
      }
    }
    // 다른 에러는 다시 throw
    console.error('좋아요 시도 중 오류:', error);
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
  try {
    await axiosInstance.delete<LPDetailResponse>(`/v1/lps/${lpId}`);
  } catch (error: any) {
    // 서버 에러(500) 또는 네트워크 에러에 대한 구체적인 에러 메시지를 포함
    if (error.response && error.response.status === 500) {
      console.error('서버 내부 오류로 인한 LP 삭제 실패:', error);
      throw new Error('서버 내부 오류로 LP 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
    
    // 그 외 에러는 그대로 던짐
    console.error('LP 삭제 중 오류:', error);
    throw error;
  }
};
