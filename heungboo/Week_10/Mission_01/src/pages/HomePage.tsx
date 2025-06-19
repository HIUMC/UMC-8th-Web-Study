import useFetch from "../hooks/useFetch";
import { MovieFilters, MovieResponse } from "../types/movie";
import MovieList from "../components/MovieList";
import MovieFilter from "../components/MovieFilter";
import { useCallback, useEffect, useMemo, useState } from "react";

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

  /********************** API 호출 ****************/
  const { data, error, isloading } = useFetch<MovieResponse>(
    "/search/movie",
    axiosRequestConfig
  );

  // console.log(data?.results);

  const handleMovieFilters = useCallback(
    (filters: MovieFilters): void => {
      setFilters(filters);
    },
    [setFilters]
  );

  /***********  스크롤 이벤트를 감지하여 필터 컴포넌트의 표시 여부를 결정하는 상태 **********/
  const [showFilter, setShowFilter] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowFilter(false); // 스크롤이 100px 이상이면 숨김
      } else {
        setShowFilter(true); // 스크롤이 100px 이하이면 표시
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /****************  에러 시  ***********************/
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container ">
      <div className="flex flex-col items-center justify-center pt-10">
        {showFilter && (
          <div className="fixed top-0 z-10  shadow-md">
            <MovieFilter onChange={handleMovieFilters} />
          </div>
        )}
        <div className="pt-[120px] container mx-auto">
          {isloading ? (
            <div>로딩 중 입니다...</div>
          ) : (
            <MovieList movies={data?.results || []} />
          )}
        </div>
      </div>
    </div>
  );
}
