import { useEffect, useState } from "react";
import axios from "axios";

interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

function useCustomFetch<T>(url: string): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(false);
        setErrorMessage(null);
        
        const token = import.meta.env.VITE_TMDB_KEY;
        
        const response = await axios.get<T>(url, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
        setErrorMessage('데이터를 불러오는 중 오류가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, isError, error: errorMessage };
}

export default useCustomFetch;