import { useQuery } from "@tanstack/react-query";
import { getLpDetails } from "../../apis/lp"; // Assuming you have a function to fetch LP details
import { QUERY_KEY } from "../../constants/key";

export default function useGetLpDetails({lpId}: { lpId: string }) {
    return useQuery({
        queryKey: [QUERY_KEY.lp(lpId)],
        queryFn: () => getLpDetails(lpId),
        staleTime: 1000 * 60 * 5, // 5분 동안 기존 데이터를 그대로 활용해 네트워크 요청을 줄인다.
        gcTime: 1000 * 60 * 10, // 10분 동안 사용되지 않으면 해당 캐시 데이터가 삭제되어, 다시 요청 시 데이터를 받아오게 한다.
        select: (data)=>data.data,
    })
}