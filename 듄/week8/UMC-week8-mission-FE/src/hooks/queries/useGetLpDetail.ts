import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../../apis/lp";
import { RequestLpDto } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpDetail({lpId}: RequestLpDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail({lpId}),
  });
}

export default useGetLpDetail;
