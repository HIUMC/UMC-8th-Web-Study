import { useCallback, useMemo, useState } from 'react';
import MovieFilter from '../components/MovieFilter';
import MovieList from '../components/MovieList';
import MovieModal from '../components/MovieModal';
import useFetch from '../hooks/useFetch';
import type { MovieFilters, MovieResponse, Movie } from '../types/movie';

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: '어벤져스',
    include_adult: false,
    language: 'ko-KR',
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // 모달을 위한 상태

  const axiosRequestConfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters]
  );

  const { data, error, isLoading } = useFetch<MovieResponse>(
    '/search/movie',
    axiosRequestConfig
  );

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
    <div className="container mx-auto px-4 py-8">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div className="text-center mt-4">로딩 중입니다...</div>
      ) : (
        <MovieList
          movies={data?.results || []}
          onSelect={(movie) => setSelectedMovie(movie)}
        />
      )}

      {/* 모달 표시 */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}
