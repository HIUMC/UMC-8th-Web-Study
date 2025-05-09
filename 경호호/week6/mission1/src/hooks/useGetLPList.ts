import { useQuery } from '@tanstack/react-query';
import { getLPList } from '../api/lp';
import { LP, PaginationDto } from '../types/lp';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useGetLPList = (params: PaginationDto = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.LP.list(params),
    queryFn: async () => {
      const response = await getLPList(params);
      console.log('원래 API 응답 구조:', response);
      return response;
    },
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    select: (data) => {
      console.log('select 에 넘어온 데이터:', data);
      
      // 타입 정의에 따라 LPListResponse는 ApiResponse<CursorBasedResponse<LP>> 구조
      // 즉, { status, message, statusCode, data: { data: LP[], nextCursor, hasNext } }
      if (data && data.data) {
        console.log('data.data 구조:', data.data);
        
        // 정확한 유형에 따라 data.data는 CursorBasedResponse
        if (data.data.data && Array.isArray(data.data.data)) {
          console.log('LP 배열 출력:', data.data.data);
          return {
            paginationInfo: {
              nextCursor: data.data.nextCursor,
              hasNext: data.data.hasNext
            },
            items: data.data.data as LP[]
          };
        }
      }
      
      // 기본값 반환
      console.log('데이터가 없거나 다른 구조임');
      return {
        paginationInfo: {
          nextCursor: null,
          hasNext: false
        },
        items: []
      };
    },
  });
};
