import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { RequestLpDto } from "../../types/lp";
import { getLpDetail } from "../../apis/lp";

function useGetLpDetail({ lpId }: RequestLpDto) {
  return useQuery({
    queryKey: [QUERY_KEY.lps, lpId],
    queryFn: () => getLpDetail({ lpId }),
  });
}

export default useGetLpDetail;

// 사용법
// const {lpId} = useParams();
// const {data:lp, ispending, isError} = useGetLpDetail({ lpId : Number(lpId) });
// if (ispending) return <div>Loading...</div>;
// if (isError) return <div>Error</div>;

// return 문
// {lp?.data.title} 등 처럼 사용
