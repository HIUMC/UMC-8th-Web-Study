import { useQuery } from "@tanstack/react-query";
import { PaginationDto } from "../../types/common";
import { QUERY_KEY } from "../../constants/key";
import { getLpList } from "../../apis/lp";
// import { ResponseLpListDto } from "../../types/lp";

/*
const initialLpListData: ResponseLpListDto = {
    status: true,
    statusCode: 200,
    message: "",
    data: {
        data:[],
    },
    nextCursor: 0,
    hasNext: false,
}
*/

function useGetLpList({ cursor, search, order, limit }: PaginationDto) {
    return useQuery({
        queryKey: [QUERY_KEY.lps, search, order],
        queryFn: () => getLpList({
            cursor,
            search,
            order,
            limit,
        }),

        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes

        // enabled: 조건에 따라 쿼리 재실행 여부를 제어한다.
        // 아래 코드의 경우: 검색어가 있는 경우에만 쿼리를 실행.
        // enabled: Boolean(search),

        //refetchInterval: 1 * 60,

        // retry: 쿼리 실패시 재시도 횟수
        // 기본값 3회.
        // 네트워크 오류 등 임시적인 문제를 보완 가능함.
        // retry: 3,

        // initialData: 쿼리 실행 전 미리 제공할 초기 데이터를 설정.
        // 컴포넌트가 렌더링될 때 빈 데이터 구조를 미리 제공해서, 로딩 전에도 안전하게 UI를 구성할 수 있게 해주는 역할.
        // initialData: initialLpListData,

        // 파라미터가 변경될 떄 이전 데이터를 유지하여 UI 깜빡임을 줄여줌.
        // 이전 데이터를 유지
        // keepPreviousData: true,

        // 쿼리 결과에서 필요한 데이터만 선택하여 반환
        select: data => data.data,

        
    });
}

export default useGetLpList;