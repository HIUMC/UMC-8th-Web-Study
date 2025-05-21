import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchComments, CommentListResponse } from '../apis/commentapi';

export function useCommentsInfinite(
  lpId: number,
  order: 'asc' | 'desc'
) {
  return useInfiniteQuery<CommentListResponse, Error>({
    queryKey: ['comments', lpId, order] as const,
    queryFn: ({ pageParam = undefined }) =>
      fetchComments({ lpId, cursor: pageParam, order }),
    getNextPageParam: last => (last.hasNext ? last.nextCursor : undefined),
    initialPageParam: undefined,
    staleTime: 1000 * 60,
  });
}