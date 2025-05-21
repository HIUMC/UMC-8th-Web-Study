import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchLpList } from '../apis/lpApi';
import type { LpListResponse } from '../apis/lpauth';

export function useLpInfiniteList(order: 'asc' | 'desc', search: string = '') {
  return useInfiniteQuery<LpListResponse, Error>({
    queryKey: ['lpList', order,search] as const,
    queryFn: ({ pageParam = undefined }) =>
      fetchLpList({ order, search, cursor: typeof pageParam === 'number' ? pageParam : undefined }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor : undefined,
    initialPageParam: undefined,   
    staleTime: 1000 * 60,          // 1분간 fresh
  });
}