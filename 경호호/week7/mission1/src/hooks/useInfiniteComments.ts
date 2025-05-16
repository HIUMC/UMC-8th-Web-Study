import { useInfiniteQuery } from '@tanstack/react-query';
import { PaginationOrder } from '../types/lp';
import { Comment } from '../types/comment';
import { getCommentList } from '../api/comment';
import { QUERY_KEYS } from '../constants/queryKeys';

interface InfiniteCommentsParams {
  lpId: string;
  initialCursor?: string;
  limit?: number;
  order?: PaginationOrder;
}

export const useInfiniteComments = (params: InfiniteCommentsParams) => {
  const { lpId, initialCursor = '0', limit = 10, order = PaginationOrder.DESC } = params;

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.COMMENT.infiniteList({ lpId, order }),
    queryFn: async ({ pageParam = initialCursor }) => {
      const response = await getCommentList({
        lpId,
        cursor: pageParam as string,
        limit,
        order
      });

      console.log('댓글 API 응답:', response);
      if (response) {

        if (response.data && Array.isArray(response.data.data)) {
          return {
            nextCursor: response.data.nextCursor,
            hasNext: response.data.hasNext,
            comments: response.data.data as Comment[]
          };
        }

        else if (Array.isArray(response.data)) {
          return {
            nextCursor: null,
            hasNext: false,
            comments: response.data as Comment[]
          };
        }

        else if (response.data) {
          return {
            nextCursor: response.nextCursor || null,
            hasNext: response.hasNext || false,
            comments: response.data as unknown as Comment[]
          };
        }
      }

      // 기본 반환값
      return {
        nextCursor: null,
        hasNext: false,
        comments: []
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
