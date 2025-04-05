import { useState } from 'react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div 
      className="relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={posterUrl} 
        alt={movie.title} 
        className="w-full h-auto object-cover"
      />
      
      <div 
        className={`absolute inset-0 bg-black bg-opacity-70 flex flex-col justify-end p-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-white font-bold text-lg mb-2">{movie.title}</h3>
        <p className="text-white text-sm line-clamp-3">{movie.overview}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-yellow-400">⭐ {movie.vote_average.toFixed(1)}</span>
          <span className="text-gray-300 text-sm">{movie.release_date.split('-')[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 