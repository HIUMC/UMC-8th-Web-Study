import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { getMyInfo } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext"; //  추가

function useGetMyInfo() {
  const { accessToken } = useAuth(); 

  return useQuery({
    queryKey: [QUERY_KEY.myInfo],
    queryFn: getMyInfo,
    enabled: !!accessToken,
  });
}

export default useGetMyInfo;
