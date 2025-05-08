import { useState, useEffect, React } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import PageNation from "../components/PageNation";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import { usePending } from "../context/useLoading";

export default function MoviePage() {
  const { isPending, setIsPending } = usePending();
  const [movies, setMovies] = useState<Movie[]>([]);
  //1. 로딩 상태 만들기
  //2. 에러 상태 만들기
  const [isError, setIsError] = useState(false);
  //3. 페이지
  const [page, setPage] = useState(1);
  const { category } = useParams<{
    category: string;
  }>();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          },
        );
        setMovies(data.results);

        console.log(data);
        console.log(data.results[0].id);
        setIsPending(false);
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
      <PageNation page={page} setPage={setPage} />
      {isPending && (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className="p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              category={category ?? "default-category"}
            />
          ))}
        </div>
      )}
    </>
  );
}
