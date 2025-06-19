import React from 'react';
import {useMemo, useState, useCallback} from 'react';

import useFetch from '../hooks/useFetch';
import type { MovieFilters, MovieResponse } from '../types/movie';
import MovieList from '../components/MovieList';
import MovieFilter from '../components/MovieFilter';
import type { AxiosRequestConfig } from 'axios';

export default function HomePage(): React.ReactElement {
    const [filters, setFilters] = useState<MovieFilters>({
        query: '어벤져스',
        include_adult: false,
        language: 'ko-KR',
    });

    const requestConfig = useMemo(
        (): AxiosRequestConfig => ({
            params: filters,
        }), 
        [filters], 
    );

    const {data, error, isLoading} = useFetch<MovieResponse>('/search/movie', requestConfig);

    const handleMovieFilters = useCallback((newFilters: MovieFilters): void => {
        setFilters(newFilters);
        console.log('필터 변경:', newFilters);
    }, []);

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">영화 검색</h1>
                <div className="text-red-500">에러가 발생했습니다: {error.message}</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">영화 검색</h1>
            <MovieFilter onChange={handleMovieFilters}/>
            {isLoading ? (
                <div className="mt-4 text-center">
                    <p>로딩중입니다...</p>
                </div>
            ) : (
                <div className="mt-4">
                    <MovieList movies={data?.results || []} />
                </div>
            )}
        </div>
    );
}