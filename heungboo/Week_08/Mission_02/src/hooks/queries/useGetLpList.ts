import { useQuery } from "@tanstack/react-query";
import { PageinationDto } from "../../types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

// 재사용을 위해서 hook 으로 만들어줌
// HomePage 에서 useQuery 를 사용하지 않고 useGetLpList 를 바로 이용하여 편리하게 사용함./
// PageinationDto (Request) 타입을 받아서 cursor, search, order, limit 을 받아옴
function useGetLpList({ cursor, search, order, limit }: PageinationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () =>
      getLpList({
        cursor,
        search,
        order,
        limit,
      }),
    staleTime: 1000 * 60 * 5, // 신선한 데이터 시간, 5분동안 기존(캐시된) 데이터 그대로 사용
    // 자주사용하면 staleTime을 늘려주고, 자주 사용하지 않으면 줄여줌
    // cacheTime: 1000 * 60 * 10, // 캐시된 데이터가 메모리에서 삭제되는 시간

    // refetchInterval: 1000 * 60, // 1분마다 refetch
    // retry: 3, // 실패했을 때 재시도 횟수
    // retryDelay: 1000, // 재시도 대기시간
    // refetchOnMount: false, // 마운트할 때 refetch 하지 않음
    // refetchOnReconnect: false, // 재연결할 때 refetch 하지 않음
    // refetchOnFocus: false, // 포커스할 때 refetch 하지 않음
    // refetchIntervalInBackground: false, // 백그라운드에서 refetch 하지 않음
    // refetchOnReconnect: false, // 재연결할 때 refetch 하지 않음
    // refetchOnMount: false, // 마운트할 때 refetch 하지 않음
    // refetchOnReconnect: false, // 재연결할 때 refetch 하지 않음
    // refetchOnFocus: false, // 포커스할 때 refetch 하지 않음

    // refetchOnWindowFocus: false, // 창을 다시 포커스할 때 refetch 하지 않음

    gcTime: 1000 * 60 * 10, // 10분 동안 사용하지 않으면 메모리에서 삭제
    select: (data) => data.data.data,
    // enabled: Boolean(search), // search 값이 있을 때만 쿼리 실행
  });
}

export default useGetLpList;
