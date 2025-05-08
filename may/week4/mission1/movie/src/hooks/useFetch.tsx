import { useEffect, useState } from "react"
import axios from "axios"


export function useFetch<T>(url: string, headers?: object){
    const [data, setData] = useState<T|null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(url, { headers });
                setData(response.data);
            } catch (err)   {
                setError("오류 발생");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [url])
        
    return { data, loading, error };
}