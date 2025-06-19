import { useEffect, useState } from "react";
import { type AxiosRequestConfig } from "axios";
import { axiosClient } from "../apis/axiosClient";

export const useFetch = <T>(url: string, options: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log("useFetch called with url:", url, "and options:", options);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const { data } = await axiosClient.get<T>(url, { ...options });

        setData(data);
      } catch (error) {
        setError("arising error while fetching data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, options]);

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetch;
