import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { apiClient } from '../services/movieService'; // apiClient 임포트

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
    console.log(`[useFetch] Attempting to fetch data from: ${url}`, options); // 로그 수정
    try {
      console.log('[useFetch] Setting state to loading: true'); // 로그 추가
      setState(prev => ({ ...prev, loading: true, error: null }));

      // 캐시 무력화를 위해 URL에 타임스탬프 추가
      const cacheBustingUrl = `${url}${url.includes('?') ? '&' : '?'}_t=${Date.now()}`;
      console.log(`[useFetch] Cache busting URL: ${cacheBustingUrl}`);

      // axios 대신 apiClient 사용, 캐시 헤더 제거
      const response: AxiosResponse<T> = await apiClient(cacheBustingUrl, options);

      console.log('[useFetch] Data received successfully:', response.data); // 로그 수정
      console.log('[useFetch] Setting state with received data, loading: false'); // 로그 추가
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
    } catch (err) {
      const error = err as Error | AxiosError;
      console.error('[useFetch] Error occurred while fetching data:', error); // 로그 수정
      console.log('[useFetch] Setting state with error, loading: false'); // 로그 추가
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
  }, [url, JSON.stringify(options)]);

  return {
    ...state,
    refetch: fetchData,
  };
};

export default useFetch;
