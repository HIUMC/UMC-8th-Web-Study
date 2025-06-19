import useFetch from "../assets/hooks/useFetch";
import {
  type Movie,
  type MovieFilterType,
  type MovieResponse,
} from "../assets/types/movies";
import MovieList from "../assets/components/MovieList";
import MovieFilter from "../assets/components/MovieFilter";
import { useState, useMemo, useCallback } from "react";
const HomePage = () => {
  const [filters, setFilters] = useState<MovieFilterType>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });
  const axiosRequestConfig = useMemo(() => ({ params: filters }), [filters]);

  console.log("axiosRequestConfig", axiosRequestConfig);
  const { data, error, isLoading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig,
  );

  const handleMovieFilters = useCallback(
    (filters: MovieFilterType) => {
      setFilters(filters);
    },
    [setFilters],
  ); // callback으로 감싸줬으므로 참조값이 고정된 stable한 reference가 됨. 이 의존성 배열 함수는 setFilters의 값이 변경되지 않는 한 값은 항상 유지됨
  //근데 이렇게 해도 props로 전달하고 있는데 이게 자식으로 갔을 때 자식에서 바뀐 props를 신경쓰지 않음 -> memo로 감싸줘야 함.

  if (error) {
    return <div> {error} </div>;
  }

  console.log(data);

  return (
    <div className="container mt-20 mx-auto items-center flex flex-col">
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading && <div>Loading...</div>}
      {!isLoading && <MovieList movies={data?.results || []} />}
      hello
    </div>
  );
};

export default HomePage;
