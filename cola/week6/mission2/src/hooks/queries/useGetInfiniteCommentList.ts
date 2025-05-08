import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGINATION_ORDER } from "../../enums/common";
import { getCommentList } from "../../apis/comment";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteCommentList(
  lpId: number,
  limit: number,
  order: PAGINATION_ORDER,
) {
  return useInfiniteQuery({
    queryKey: [...QUERY_KEY.lp(lpId), limit, order],
    queryFn: ({ pageParam }) =>
      getCommentList({ lpId, cursor: pageParam, limit, order }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}
export default useGetInfiniteCommentList;