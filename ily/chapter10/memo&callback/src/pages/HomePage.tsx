import useFetch from "../assets/hooks/useFetch";
import {
  type Movie,
  type MovieFilterType,
  type MovieResponse,
} from "../assets/types/movies";
import MovieList from "../assets/components/MovieList";
import MovieFilter from "../assets/components/MovieFilter";
import { useState, useMemo, useCallback } from "react";
import MovieModal from "../assets/components/MovieModal";
const HomePage = () => {
  const [filters, setFilters] = useState<MovieFilterType>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(() => ({ params: filters }), [filters]);
  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig,
  );

  const handleMovieFilters = useCallback(
    (filters: MovieFilterType) => {
      setFilters(filters);
    },
    [setFilters],
  );

  // callback으로 감싸줬으므로 참조값이 고정된 stable한 reference가 됨. 이 의존성 배열 함수는 setFilters의 값이 변경되지 않는 한 값은 항상 유지됨
  //근데 이렇게 해도 props로 전달하고 있는데 이게 자식으로 갔을 때 자식에서 바뀐 props를 신경쓰지 않음 -> memo로 감싸줘야 함.

  if (error) {
    return <div> {error} </div>;
  }

  console.log(data);

  //모달을 위한 작업
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };
  const handleCloseModal = useCallback(() => {
    setSelectedMovie(null);
  }, []);

  return (
    <div className="container mt-20 mx-auto items-center flex flex-col">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <MovieList movies={data?.results || []} onCardClick={handleOpenModal} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default HomePage;
