import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movies";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageButton } from "../components/PageButton";
import { useParams } from "react-router-dom";

export default function MoviePage(): ReactElement {
  const [movies, setMovies] = useState<Movie[]>([]);

  //1. 로딩 상태
  const [isPending, setIsPending] = useState(false);

  //2. 에러 상태
  const [isError, setIsError] = useState(false);

  //3. 페이지 처리
  const [page, setPage] = useState(1);

  const { category } = useParams<{ category: string }>();

  //   useEffect((): void => {
  //     const response = fetch(
  //       `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1`
  //     );
  //     console.log(response);
  //   }, []);

  // fetch 를 사용하면, 실질적인 data 값들은 const result = await response.json() 으로 풀어주는 과정이 필요함

  useEffect((): void => {
    const fetchMovies = async () => {
      // 로딩 중임
      setIsPending(true);

      try {
        // response.data.results 를 하는 과정을 {data} 구조 분해 할당으로 받음으로써 data.results 로 받음
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            // 환경 변수를 사용할 때 항상 접두사 VITE 를 붙여줘야함. (VITE_TMDB_KEY)
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              "Content-Type": "application/json",
              // Content-Type : image 나 Form data 를 넣을 때 바꿔줘야함 ! -> json 형식이 아닌듯
            },
          }
        );
        setMovies(data.results);
        console.log(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    fetchMovies();
  }, [page, category]);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center gap-6 mt-5">
        <PageButton page={page} setPage={setPage} />
      </div>

      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
