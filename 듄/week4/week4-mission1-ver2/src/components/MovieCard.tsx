import { Link } from 'react-router-dom';
import type { FC } from 'react';
import type { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-white text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
            <p className="text-sm">{movie.release_date.split('-')[0]}년</p>
            <p className="text-sm">{movie.vote_average.toFixed(1)}점</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;