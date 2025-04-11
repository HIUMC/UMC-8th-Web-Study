import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseFetchReturn<T> extends FetchState<T> {
  refetch: () => Promise<void>;
}

/**
 * 데이터 fetching을 위한 커스텀 훅
 * @param url API 요청 URL
 * @param options Axios 요청 옵션
 * @returns 데이터, 로딩 상태, 에러 정보 및 refetch 함수
 */
const useFetch = <T>(
  url: string, 
  options?: AxiosRequestConfig
): UseFetchReturn<T> => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async (): Promise<void> => {
    console.log(`[useFetch] Fetching data from: ${url}`, options); // <-- 로그 추가
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const response: AxiosResponse<T> = await axios(url, options);

      console.log('[useFetch] Data received:', response.data); // <-- 로그 추가
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = err as Error | AxiosError;
      console.error('[useFetch] Error fetching data:', error); // <-- 로그 추가

      setState({
        data: null,
        loading: false,
        error: axios.isAxiosError(error)
          ? error.response?.data?.message || error.message
          : '데이터를 불러오는 중 오류가 발생했습니다.'
      });
    }
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, JSON.stringify(options)]); // README.md에 있던 개선 사항 반영

  return {
    ...state,
    refetch: fetchData,
  };
};

export default useFetch;
