import axios from 'axios';
import type { LpListResponse, lpFetchParams, LpDetailResponse} from './lpauth';

export const fetchLpList = async ({cursor = 0, limit = 10, search = '', order = 'asc',
}: lpFetchParams): Promise<LpListResponse> => {
  const base = import.meta.env.VITE_SERVER_URL!; 

  const res = await axios.get(`${base}/v1/lps`, {
    params: { cursor, limit, search, order },
  });

  const {
    data: {
      data: list,
      nextCursor,
      hasNext,
    },
  } = res.data;
  console.log("!!",res);
  return { data: list, nextCursor, hasNext };
};

export const fetchLpDetail = async (lpid: number): Promise<LpDetailResponse> => {
  const base = import.meta.env.VITE_SERVER_URL!;
  const res = await axios.get(`${base}/v1/lps/${lpid}`);
  // Swagger 응답 구조가 { status, message, statusCode, data: {...} }
  return res.data.data as LpDetailResponse;
};

