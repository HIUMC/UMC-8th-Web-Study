import { ReactElement, useState } from "react";
import { MovieResponse } from "../types/movies";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { PageButton } from "../components/PageButton";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import MovieCard from "../components/MovieCard";

export default function MoviePage(): ReactElement {
  const [page, setPage] = useState(1);

  const { category } = useParams<{ category: string }>();
  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;

  const {
    data: movies,
    isPending,
    isError: isError,
  } = useCustomFetch<MovieResponse[]>(url);

  console.log(movies);

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
          {movies?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
