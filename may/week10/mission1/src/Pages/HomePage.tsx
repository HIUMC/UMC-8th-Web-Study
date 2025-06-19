import { useCallback, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import type { MovieFilters, MovieResponse } from '../types/movie';
import MovieFilter from '../components/MovieFilter';
import MovieList from '../components/MovieList';
import type { Movie } from '../types/movie';
import Modal from '../components/Modal';

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: '어벤져스',
    include_adult: false,
    language: 'ko-KR',
  });

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
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
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <MovieFilter onChange={handleMovieFilters} />
        {isLoading ? (
          <div className="text-center mt-4">로딩 중입니다...</div>
        ) : (
          <MovieList
            movies={data?.results || []}
            onSelect={(movie) => {
              setSelectedMovie(movie);
              setIsModalOpen(true);
            }}
          />
        )}
      </div>
  
      {isModalOpen && selectedMovie && (
        <Modal
          movie={selectedMovie}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
  
}
///검색필터
///영화무비