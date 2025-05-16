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
    console.error(`LP 삭제 중 오류 발생 (ID: ${lpId}):`, error);
    
    if (error.response) {
      // 서버에서 응답이 왔지만 에러 상태 코드인 경우
      if (error.response.status === 500) {
        throw new Error('서버 내부 오류로 LP 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
      } else if (error.response.status === 404) {
        throw new Error('해당 LP를 찾을 수 없습니다. 이미 삭제되었거나 존재하지 않습니다.');
      } else if (error.response.status === 403) {
        throw new Error('이 LP를 삭제할 권한이 없습니다.');
      } else {
        throw new Error(`LP 삭제 중 오류가 발생했습니다: ${error.response.data?.message || '알 수 없는 오류'}`);
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      throw new Error('서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.');
    } else {
      // 요청 설정 중 오류가 발생한 경우
      throw new Error(`요청 설정 중 오류가 발생했습니다: ${error.message}`);
    }
  }
};
