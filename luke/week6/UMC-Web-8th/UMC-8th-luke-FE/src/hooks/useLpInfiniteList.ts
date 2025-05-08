import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchLpList } from '../apis/lpApi';
import type { LpListResponse } from '../apis/lpauth';

export function useLpInfiniteList(order: 'asc' | 'desc') {
  return useInfiniteQuery<LpListResponse, Error>({
    queryKey: ['lpList', order] as const,
    queryFn: ({ pageParam = undefined }) =>
      fetchLpList({ order, cursor: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: undefined,   
    staleTime: 1000 * 60,          // 1분간 fresh
  });
}