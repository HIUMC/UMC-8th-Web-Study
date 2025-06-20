import type { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const useFetch = <T>(url: string, options?: AxiosRequestConfig): { data: T | null; error: Error | null; loading: boolean } => {
    const [data, setDate] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(():void => {
        const fetchData = async () : Promise<void> => {
            setLoading(true);
            try{
                const {data} = await axiosClient.get(url, {
                    ...options
                })
                setDate(data)
            } catch {
                setError(new Error("데이터를 가져오는 중 오류가 발생했습니다."));
            } finally{
                setLoading(false);
            }
        }

        fetchData();
    }, [url, JSON.stringify(options)]);

    return(
        { data, error, loading }
    )
}

export default useFetch;