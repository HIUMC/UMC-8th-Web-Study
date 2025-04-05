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
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const response: AxiosResponse<T> = await axios(url, options);
      
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = err as Error | AxiosError;
      
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
  }, [url]);

  return {
    ...state,
    refetch: fetchData,
  };
};

export default useFetch; 