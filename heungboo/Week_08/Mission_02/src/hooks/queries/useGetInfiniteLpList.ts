import { useInfiniteQuery } from "@tanstack/react-query";
import { getLpList } from "../../apis/lp";
import { PAGINATION_ORDER } from "../../enums/commons";
import { QUERY_KEY } from "../../constants/key";

function useGetInfiniteLpList(
  limit: number,
  search: string,
  order: PAGINATION_ORDER
) {
  return useInfiniteQuery({
    queryKey: [QUERY_KEY.lps, search, order],

    queryFn: ({ pageParam }) =>
      getLpList({ cursor: pageParam, limit, search, order }),

    // 페이지가 0부터 시작?
    initialPageParam: 0,

    // 다음페이지 요청
    getNextPageParam: (lastPage) => {
      return lastPage.data.hasNext ? lastPage.data.nextCursor : undefined;
    },
  });
}

export default useGetInfiniteLpList;
