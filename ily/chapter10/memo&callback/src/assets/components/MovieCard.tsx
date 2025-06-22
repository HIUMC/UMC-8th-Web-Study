import type { Movie } from "../types/movies";
import { useEffect, useState } from "react";
interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}
const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
  const fallbackImageUrl = "https://via.placeholder.com/500x750";
  console.log("MovieCard내부에서 작성된 :", movie);

  return (
    <div
      className="rounded-lg bg-white shadow-md transition-all hover:shadow-lg w-full h-full cursor-pointer"
      onClick={onClick}
    >
      <div className="relative h-80 overflow-hidden">
        <img
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105 "
          src={
            movie.poster_path
              ? `${imageBaseUrl}${movie.poster_path}`
              : fallbackImageUrl
          }
          alt={`${movie.title} 포스터`}
        />
        <div className="absolute right-2 top-2 rounded-md bg-blue-500 px-2 py-1 text-sm font-bold text-white">
          {movie.vote_average.toFixed(1)}
        </div>
      </div>

      <div>
        <h3 className="p-4 text-lg font-semibold">{movie.title}</h3>
        <p className="px-4 pb-4 text-gray-600">{movie.overview}</p>
        <div className="px-4 pb-4 text-sm text-gray-500">
          {new Date(movie.release_date).toLocaleDateString()} |{" "}
          {movie.original_language?.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
