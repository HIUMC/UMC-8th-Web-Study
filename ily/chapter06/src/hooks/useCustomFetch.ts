import axios from "axios";
import { Movie } from "../types/movie";
import { useEffect, useState } from "react";
interface ApiResponse<T> {
  data: T | null; // T << 우리가 값을 주겠다는 말임
  isPending: boolean;
  isError: boolean;
}

type Language = "ko-KR" | "en-US";

function useCustomFetch<T>(
  url: string,
  language: Language = "en-US",
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsPending(true);
      try {
        const response = await axios.get<T>(url, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
          params: {
            language,
          },
        });

        setData(response.data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isPending, isError };
}

export default useCustomFetch;
