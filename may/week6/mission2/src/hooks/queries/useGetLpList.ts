import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
      //데이터가 신선하다고 간주하는 시간
    staleTime: 1000 * 60 * 5, 
    gcTime: 100 * 60 * 10, 
    select: (data) => data.data.data,
  });
}

export default useGetLpList;