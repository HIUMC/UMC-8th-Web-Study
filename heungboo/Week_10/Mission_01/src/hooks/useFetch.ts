import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { axiosClient } from "../apis/axiosClient";

const useFetch = <T>(
  url: string,
  options?: AxiosRequestConfig
): { data: T | null; error: string | null; isloading: boolean } => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isloading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const FetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const { data } = await axiosClient.get(url, {
          ...options,
        });
        setData(data);
      } catch {
        setError("데이터를 가져오는 데 에러가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    FetchData();
  }, [url, options]);

  return {
    data,
    error,
    isloading,
  };
};

export default useFetch;
