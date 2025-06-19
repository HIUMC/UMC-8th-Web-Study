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
      className="group bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border border-slate-200/50 hover:border-slate-300/70 transform hover:scale-[1.02] hover:-translate-y-1"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* 오버레이 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* 평점 배지 */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg">
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-sm font-semibold text-slate-700">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 line-clamp-2 group-hover:text-slate-900 transition-colors">
          {movie.title}
        </h3>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-500 font-medium bg-slate-100/50 px-3 py-1 rounded-full">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
          </span>
          
          <div className="flex items-center space-x-1 text-slate-400 group-hover:text-slate-600 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span className="text-xs font-medium">자세히 보기</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MovieCard); 