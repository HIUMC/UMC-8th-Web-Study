import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import MovieFilter from "../components/MovieFilter";
import type { Movie, MovieFilters, MovieResponse } from "../types/movie";
import { useState, useMemo, useCallback } from "react";
import MovieModal from "../components/MovieModal";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(() => ({ params: filters }), [filters]);

  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );

  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters]
  );

  // 모달 상태 추가
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h1 className="text-5xl font-extrabold text-center mb-6">
        <span
          className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500
               bg-clip-text text-transparent animate-pulse"
        >
          MovieSite🎬
        </span>
      </h1>

      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? (
        <div>로딩 중입니다...</div>
      ) : (
        <>
          {/* 모달 열기 위한 onMovieClick props 추가 */}
          <MovieList
            movies={data?.results || []}
            onMovieClick={handleMovieClick}
          />
          {isModalOpen && selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
          )}
        </>
      )}
    </div>
  );
}
