import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyInfo } from "../../apis/auth";

function useGetMyInfo(accessToken: string | null) {
  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    // accessToken이 있을때만 쿼리 실행
    enabled: !!accessToken,
  });
}

export default useGetMyInfo;

// 사용법
// 내 정보 조회
// const { accessToken } = useAuth();
// const {data: me} = useGetMyInfo(accessToken);
// console.log(me);
