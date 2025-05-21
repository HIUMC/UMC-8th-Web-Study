import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentList } from "../../apis/comment";
import { ResponseCommentListDto } from "../../types/comment";
import { PAGINATION_ORDER } from "../../enums/commons";
import { QUERY_KEY } from "../../constants/key";

function useInfiniteComments(
  lpId: number,
  order: PAGINATION_ORDER,
  limit: number = 10
) {
  if (!lpId) {
    throw new Error(
      "Invalid lpId: lpId is required and must be a valid number."
    );
  }

  if (!["asc", "desc"].includes(order)) {
    throw new Error("Invalid order: order must be 'asc' or 'desc'.");
  }

  return useInfiniteQuery<ResponseCommentListDto, Error>({
    queryKey: [QUERY_KEY.comments, lpId, order],
    queryFn: ({ pageParam }) =>
      getCommentList({
        lpId,
        cursor: pageParam,
        limit,
        order,
      }),

    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useInfiniteComments;
