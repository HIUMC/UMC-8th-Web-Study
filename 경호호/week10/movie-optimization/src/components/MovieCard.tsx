import { memo } from 'react';
import type { Movie } from '../types/Movie';

interface MovieCardProps {
  movie: Movie;
  onClick: (movieId: number) => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const handleClick = () => {
    onClick(movie.id);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer transform hover:scale-105"
      onClick={handleClick}
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {movie.title}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">{movie.release_date}</span>
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            ⭐ {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieCard); 