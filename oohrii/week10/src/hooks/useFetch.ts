import type { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import { axiosClient } from "../apis/axiosClients";

const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axiosClient.get<T>(url, {
                    ...options,
                });

                setData(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [url, options]);

    return {
        data, 
        error, 
        isLoading
    };
};

export default useFetch;
