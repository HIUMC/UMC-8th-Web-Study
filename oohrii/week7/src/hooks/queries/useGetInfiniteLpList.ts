import { useInfiniteQuery } from "@tanstack/react-query";
import { PAGINATION_ORDER } from "../../enums/common";
import { QUERY_KEY } from "../../constants/key";
import { getLpList } from "../../apis/lp";
import { Lp } from "../../types/lp";

interface LpListResponse {
  success: boolean;
  data: {
    data: Lp[];
    nextCursor: number | null;
    hasNext: boolean;
  };
  message?: string;
}

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER
) {
  return useInfiniteQuery({
    queryKey: ['lps', search, order],
    queryFn: ({ pageParam = 0 }) => 
      getLpList({
        cursor: pageParam,
        limit,
        search,
        order
      }),
    getNextPageParam: (lastPage) => 
      lastPage.data.hasNext ? lastPage.data.nextCursor : undefined,
    initialPageParam: 0,
  });
}

export default useGetInfiniteLpList;