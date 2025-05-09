import { useQuery } from '@tanstack/react-query';
import { getLPList } from '../api/lp';
import { PaginationDto } from '../types/lp';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useGetLPList = (params: PaginationDto = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.LP.list(params),
    queryFn: () => getLPList(params),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 10, // 10분
  });
};
