import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../types/movie';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  return (
    <Link to={`/movie/${movie.id}`} className="block h-full">
      <div 
        className="relative overflow-hidden rounded-xl shadow-xl h-full bg-white/10 backdrop-blur-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-white/5"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="aspect-[2/3] overflow-hidden">
          <img 
            src={posterUrl} 
            alt={movie.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            loading="lazy"
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-gray-200 font-bold text-lg line-clamp-1">{movie.title}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="flex items-center text-yellow-400">
              <span className="mr-1">⭐</span> 
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="text-gray-400 text-sm">{movie.release_date.split('-')[0]}</span>
          </div>
        </div>
        
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent backdrop-blur-sm p-4 flex flex-col justify-end transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h3 className="text-gray-100 font-bold text-lg mb-2">{movie.title}</h3>
          <p className="text-gray-300 text-sm line-clamp-3 mb-2">{movie.overview || "줄거리 정보가 없습니다."}</p>
          <div className="flex items-center">
            <span className="flex items-center text-yellow-400">
              <span className="mr-1">⭐</span> 
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard; 