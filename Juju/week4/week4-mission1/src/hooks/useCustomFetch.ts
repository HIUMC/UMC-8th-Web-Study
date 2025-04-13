// hooks/useCustomFetch.ts

import axios from "axios";
import { useEffect, useState } from "react";

interface ApiResponse<T> {
    data: T | null;
    isPending: boolean;
    isError: boolean;
}

type Language = "ko-KR" | "en-US";

function useCustomFetch<T>(
    urlOrUrls: string | Record<string, string>,
    language: Language = "en-US"
): ApiResponse<T> {
    const [data, setData] = useState<T | null>(null);
    const [isPending, setIsPending] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            setIsError(false);

            try {
                if (typeof urlOrUrls === "string") {
                    // 단일 요청
                    const response = await axios.get<T>(urlOrUrls, {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                        },
                        params: { language },
                    });
                    setData(response.data);
                } else {
                    // 복수 요청
                    const keys = Object.keys(urlOrUrls);
                    const requests = keys.map((key) =>
                        axios.get(urlOrUrls[key], {
                            headers: {
                                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            },
                            params: { language },
                        })
                    );

                    const results = await Promise.all(requests);
                    const combined = keys.reduce((acc, key, index) => {
                        acc[key] = results[index].data;
                        return acc;
                    }, {} as Record<string, T[keyof T]>);

                    setData(combined as T);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchData();
    }, [JSON.stringify(urlOrUrls), language]);

    return { data, isPending, isError };
}

export default useCustomFetch;