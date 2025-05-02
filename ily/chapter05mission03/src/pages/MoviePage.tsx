import { useState } from "react";
import { MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import PageNation from "../components/PageNation";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const { category } = useParams<{
    category: string;
  }>();
  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;
  const {
    data: movies,
    isPending,
    isError,
  } = useCustomFetch<MovieResponse[]>(url);

  console.log(movies);
  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  console.log(movies);
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
          {movies?.results.map((movie) => (
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
