import { useState, useEffect } from 'react';
import axios from 'axios';
import axiosClient from '../api/axiosClient';

interface UseFetchState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

const useFetch = <T>(url: string, options?: Parameters<typeof axios.get>[1]) => {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        const response = await axiosClient.get<T>(url, options);
        setState(prev => ({ ...prev, data: response.data, isLoading: false }));
      } catch (error) {
        setState(prev => ({
          ...prev,
          error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
          isLoading: false,
        }));
      }
    };

    fetchData();
  }, [url, options]);

  return state;
};

export default useFetch; 