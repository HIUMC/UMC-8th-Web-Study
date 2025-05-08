import { useQuery } from '@tanstack/react-query';
import { fetchLpDetail, } from '../apis/lpApi';
import type { LpDetailResponse } from '../apis/lpauth';

export function useLpDetail(lpid: number) {
  return useQuery<LpDetailResponse, Error>({
    queryKey: ['lpDetail', lpid],
    queryFn: () => fetchLpDetail(lpid),
    staleTime: 1000 * 60 * 5, // 5분간 fresh
    gcTime: 1000 * 60 * 10, // 10분간 캐시 유지
  });
}