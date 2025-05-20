import { useQuery } from '@tanstack/react-query';
import { PaginationDto } from '../../types/common';
import { getLpList } from '../../apis/lp';
import { QUERY_KEY } from '../../constants/key';

/*
const initalLpListData:ResponseLpListDto = {
    status: true,
    statusCode: 200,
    message: "",
    data: {
        data:[]
    },
    nextCursor: 0,
    hasNext: false,
}*/

export default function useGetLpList({
  cursor,
  search,
  order,
  limit,
}: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, search, order],
    queryFn: () => getLpList({ cursor, search, order, limit }),

    // 데이터가 신선하다고 간주하는 시간.
    // 이 시간 동안은 캐시된 데이터를 그대로 사용. 컴포넌트가 마운트 되거나 실제 포커스 들어오는 경우도 재요청 X
    staleTime: 1000 * 60 * 5, // 5분 동안 기존 데이터를 그대로 활용해 네트워크 요청을 줄인다.

    // 사용되지 않는 (비활성 상태)인 쿼리 데이터가 캐시에 남아있는 시간.
    // staleTime이 지나고 데이터가 신선하지 않더라도, 일정 시간 동안 메모리에 보관.
    // 그 이후에 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거된다. (garbage collection)
    gcTime: 1000 * 60 * 10, // 10분 동안 사용되지 않으면 해당 캐시 데이터가 삭제되어, 다시 요청 시 데이터를 받아오게 한다.

    // 조건에 따라 쿼리 실행 여부 제어
    // enabled: Boolean(search),

    // refetchInterval: 100*60, // 10초마다 refetch
    // retry: 3, // 실패 시 재요청 횟수
    // initialData: initalLpListData, // 초기 데이터 설정

    // 파라미터가 변경될 때 이전 데이터를 유지하여 UI 깜빡임 (Flicking)을 줄여줍니다.
    // keepPreviousData: true,

    select: (data) => data.data.data,
  });
}
