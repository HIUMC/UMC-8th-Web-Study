import MovieFilter from '../components/MovieFilter';
import MovieList from '../components/MovieList';
import useFetch from '../hooks/useFetch';
import type { MovieFilters, MovieResponse } from '../types/movie';
import { useCallback, useMemo, useState } from 'react';

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: '어벤져스',
    include_adult: false,
    language: 'ko-KR',
  });

  const axiosRequestConfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters]
  );

  const { data, error, isLoading } = useFetch<MovieResponse>('/search/movie', axiosRequestConfig);

  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters]
  );

  if (error) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <div className="container">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? <div>로딩 중입니다...</div> : <MovieList movies={data?.results || []} />}
    </div>
  );
}
