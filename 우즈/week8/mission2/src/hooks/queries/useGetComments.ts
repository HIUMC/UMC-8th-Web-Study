// src/hooks/queries/useGetComments.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getCommentsApi = async (lpId: number, token: string) => {
  const res = await axios.get(`http://localhost:8000/v1/lps/${lpId}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const useGetComments = (lpId: number, token?: string | null) => {
  return useQuery({
    queryKey: ["comments", lpId],
    queryFn: () => getCommentsApi(lpId, token!), // token은 있단 보장 하에 사용
    enabled: !!token, // 토큰 없으면 아예 요청 안 함
    retry: false, // 실패 시 재시도하지 않음
  });
};

export default useGetComments;
