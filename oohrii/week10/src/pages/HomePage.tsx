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

    const AxiosRequestConfig = useMemo(
        () : {params: MovieFilters} => ({
            params: filters,
        }), 
        [filters], 
    );

    const {data, error, isLoading} = 
    useFetch<MovieResponse>(
        '/search/movie', {
        params: filters,
    });

    const handleMovieFilters = useCallback((filters: MovieFilters) : void => {
        setFilters(filters);
    }, [setFilters]);

    if (error) {
        return <div>에러가 발생했습니다.</div>;
    }

    return (
        <div className="container">
            <MovieFilter onChange={handleMovieFilters}/>
            {isLoading ? (
                <div>로딩중입니다...</div>
            ) : (
            <MovieList movies={data?.results || []} />
            )}
        </div>
    );
}