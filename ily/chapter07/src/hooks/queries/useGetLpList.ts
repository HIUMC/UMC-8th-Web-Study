import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../utils/types/common";
import { getLpList } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps],
    queryFn: () => getLpList({ cursor, search, order, limit }), // 외부에서 받아와야 하는 것이 있으면 callback으로 이렇게 작성해야 함.

    //데이터가 신선하다고 간주되는 시간, 이 시간 동안 캐시된 데이터를 그대로 사용함. 컴포넌트가 마운트 되거나 창에 포커스 들어오는 경우도 재요청 X
    // 5분 동안 기존 데이터를 그대로 사용해서 네트워크 요청을 줄임.
    staleTime: 1000 * 60 * 5, // 5분, 데이터가 신선하다고 간주하는 시간, 컴포넌트가 마운트 되거나

    //staleTime이 지나고 데이터가 신선하지 않더라도, 일정 시간 동안 메모리에 보관.
    //그 이후 해당 쿼리가 전혀 사용되지 않으면 gcTime이 지난 후에 제거함 (grabage collection),
    //10분 동안 사용되지 않으면 해당 캐시 데이터가 삭제되어, 다시 요청 시 새 데이터를 받아오게 함.
    gcTime: 100 * 60 * 10, //10min

    //조건에 따라 쿼리의 실행 여부를 제어함.
    enabled: true,

    //주식 데이터를 이용 ranking system,, 1분 마다 자동으로 페칭
    // refetchInterval: 1000 * 10, // 10초마다 자동으로 refetch
    // retry: 쿼리 요청이 실패했ㅇ르 때 자동으로 재시도할 횟수를 지정함.
    //기본적인 값은 3회 정도이고, 네트워크 오류 등 임시적인 문제를 보완할 수 있음. 그런데 어떻게 처리하는 게 더 좋냐면, app.tsx에서 defaultdoption으로 설정해주는 것이 좋음 .

    //initialData : 쿼리 실행 전 미리 제공할 초기 데이터를 설정함 , 컴포넌특 ㅏ렌더링 될 때 빈 데이터 구조를 미리 제공해서, 로딩 전에도 안전하게 UI를 구성할 수 있도록 ㅎ재ㅜㅁ
    // initialData: [],

    select: (data) => data.data,
  });
}

export default useGetLpList;
