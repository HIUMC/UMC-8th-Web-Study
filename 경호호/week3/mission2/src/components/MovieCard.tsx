import { useState } from 'react';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;

  return (
    <div 
      className="relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={posterUrl} 
        alt={movie.title} 
        className="w-full h-auto object-cover aspect-[2/3]"
        loading="lazy"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.onerror = null;
          target.src = backdropUrl || 'https://via.placeholder.com/500x750?text=이미지+없음';
        }}
      />
      
      <div 
        className={`absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-end p-3 sm:p-4 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-white font-bold text-base sm:text-lg mb-1 sm:mb-2 line-clamp-2">{movie.title}</h3>
        <p className="text-white text-xs sm:text-sm line-clamp-3 mb-2">{movie.overview || '줄거리 정보가 없습니다.'}</p>
        <div className="flex justify-between items-center">
          <span className="text-yellow-400 text-sm sm:text-base">⭐ {movie.vote_average.toFixed(1)}</span>
          <span className="text-gray-300 text-xs sm:text-sm">{movie.release_date.split('-')[0]}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 