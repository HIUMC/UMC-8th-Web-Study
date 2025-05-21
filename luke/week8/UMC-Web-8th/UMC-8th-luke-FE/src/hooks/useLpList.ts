// src/hooks/useLpList.ts
import { useQuery } from '@tanstack/react-query';
import { fetchLpList} from '../apis/lpApi';
import type { LpListResponse,lpFetchParams } from '../apis/lpauth';

function useLpList(params: lpFetchParams) {
  return useQuery<LpListResponse>({
    queryKey: ['lpList', params],
    queryFn: () => fetchLpList(params),
    staleTime: 1000 * 60, // 1 minute
  });
}

export default useLpList;