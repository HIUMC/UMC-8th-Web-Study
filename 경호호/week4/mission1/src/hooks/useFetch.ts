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
    console.log(`[useFetch] Fetching data from: ${url}`, options);
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const response: AxiosResponse<T> = await axios(url, options);

      console.log('[useFetch] Data received:', response.data);
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = err as Error | AxiosError;
      console.error('[useFetch] Error fetching data:', error);

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
  }, [url, JSON.stringify(options)]);

  return {
    ...state,
    refetch: fetchData,
  };
};

export default useFetch;
