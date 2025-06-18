import useFetch from "../hooks/useFetch";
import { MovieFilters, MovieResponse } from "../types/movie";
import MovieList from "../components/MovieList";
import MovieFilter from "../components/MovieFilter";
import { useCallback, useMemo, useState } from "react";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: "어벤져스",
    include_adult: false,
    language: "ko-KR",
  });

  // 참조값을 고정 시키기 위해서 useMemo 를 사용해야함.
  const axiosRequestConfig = useMemo(
    (): { params: MovieFilters } => ({
      params: filters,
    }),
    [filters]
  );

  const { data, error, isloading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );

  console.log(data?.results);

  const handleMovieFilters = useCallback(
    (filters: MovieFilters): void => {
      setFilters(filters);
    },
    [setFilters]
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container ">
      <MovieFilter onChange={handleMovieFilters} />
      {isloading ? (
        <div>로딩 중 입니다...</div>
      ) : (
        <MovieList movies={data?.results || []} />
      )}
    </div>
  );
}
