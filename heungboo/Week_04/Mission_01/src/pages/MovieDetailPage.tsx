import { ReactElement } from "react";
import { useParams } from "react-router-dom";
import { MovieDetailResponse } from "../types/movies";

import useCustomFetch from "../hooks/useCustomFetch";

const MovieDetailPage = (): void | ReactElement => {
  const params = useParams();

  const url = `https://api.themoviedb.org/3/movie/${params.movieId}?language=ko-KR`;
  const {
    data: movie,
    //isPending,
    isError,
  } = useCustomFetch<MovieDetailResponse>(url);

  if (isError) {
    return (
      <div>
        <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
      </div>
    );
  }

  return (
    <div>
      MovieDetail Page
      <>
        {params.movieId}
        {movie?.id}
        {movie?.adult}
      </>
    </div>
  );
};
export default MovieDetailPage;
