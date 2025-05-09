import { useQuery } from '@tanstack/react-query';
import { getLPList } from '../api/lp';
import { LP, PaginationDto } from '../types/lp';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useGetLPList = (params: PaginationDto = {}) => {
  return useQuery({
    queryKey: QUERY_KEYS.LP.list(params),
    queryFn: () => getLPList(params),
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
    select: (data) => {
      if (data && data.data && Array.isArray(data.data.data)) {
        return {
          ...data,
          items: data.data.data as LP[]
        };
      }
      
      return {
        ...data,
        items: []
      };
    },
  });
};
