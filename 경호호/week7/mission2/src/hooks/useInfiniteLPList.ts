import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginationDto, LP } from '../types/lp';
import { getLPList } from '../api/lp';
import { QUERY_KEYS } from '../constants/queryKeys';

interface InfiniteLPListParams extends Omit<PaginationDto, 'cursor'> {
  initialCursor?: string;
}

export const useInfiniteLPList = (params: InfiniteLPListParams = {}) => {
  const { initialCursor = '0', ...restParams } = params;

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.LP.infiniteList(restParams),
    queryFn: async ({ pageParam = initialCursor }) => {
      const response = await getLPList({ 
        ...restParams, 
        cursor: pageParam as string 
      });

      if (response && response.data) {
        if (response.data.data && Array.isArray(response.data.data)) {
          return {
            nextCursor: response.data.nextCursor,
            hasNext: response.data.hasNext,
            items: response.data.data as LP[]
          };
        }
      }

      return {
        nextCursor: null,
        hasNext: false,
        items: []
      };
    },
    initialPageParam: initialCursor,
    getNextPageParam: (lastPage) => {
      if (!lastPage.hasNext) return undefined;
      return lastPage.nextCursor;
    },
    staleTime: 0,
    gcTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });
};
