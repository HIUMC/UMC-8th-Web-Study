import { useState } from "react";
import { type Movie } from "../types/movies";
import MovieCard from "./MovieCard";

interface MovieListProps {
  movies: Movie[];
  onCardClick: (movie: Movie) => void;
}

const MovieList = ({ movies, onCardClick }: MovieListProps) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const handleModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  if (movies.length === 0) {
    return (
      <div className="flex h-60">
        <p className="text-gray-500 text-center m-auto">
          검색 결과가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 overflow-auto max-h-screen">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onClick={() => onCardClick(movie)}
        />
      ))}
    </div>
  );
};

export default MovieList;
