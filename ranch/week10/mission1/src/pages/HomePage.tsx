import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieFilters, MovieResponse } from "../types/movie";

export default function HomePage() {
    const [filters, setFilters] = useState<MovieFilters>({
        query: "어벤져스", 
        include_adult: false,
        language: "ko-KR",
    }); 

    const axiosRequestConfig = useMemo(():{params: MovieFilters}=>({
        params: filters, }), [filters], 

); 

    const { data, error, isLoading } = useFetch<MovieResponse>(
        "/search/movie", 
        axiosRequestConfig,
    );

  const handleMovieFilters = useCallback(
    (filters: MovieFilters): void => {
      setFilters(filters);
    },
    [setFilters]
  );

    if (error) {
        return <div>오류가 발생했습니다: {error}</div>;
    }

return (
  <div className="w-full flex justify-center px-4 py-10">
    <div className="w-full max-w-6xl">
      {/* 검색 필터 박스 */}
      <div className="mb-10">
        <MovieFilter onChange={handleMovieFilters} />
      </div>

      {/* 결과 영역 */}
      {isLoading ? (
        <div className="text-center text-lg text-gray-600">로딩중...</div>
      ) : (
        <MovieList movies={data?.results || []} />
      )}
    </div>
  </div>
);
} 