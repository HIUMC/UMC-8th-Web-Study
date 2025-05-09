import { useQuery } from '@tanstack/react-query';
import { getLPDetail } from '../api/lp';
import { QUERY_KEYS } from '../constants/queryKeys';

export const useGetLPDetail = (lpId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.LP.detail(lpId),
    queryFn: () => getLPDetail(lpId),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    enabled: !!lpId,
  });
};
