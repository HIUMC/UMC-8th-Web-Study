import React from 'react';
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id}>
          <div className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{movie.title}</h3>
            <p className="text-sm text-gray-600">평점: {movie.vote_average}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieList; 