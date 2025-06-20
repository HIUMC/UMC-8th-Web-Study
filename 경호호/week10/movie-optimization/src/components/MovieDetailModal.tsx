import { memo } from 'react';
import type { MovieDetail } from '../types/Movie';
import Modal from './Modal';

interface MovieDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  movie: MovieDetail | null;
  isLoading: boolean;
  error: string | null;
}

const MovieDetailModal = ({ isOpen, onClose, movie, isLoading, error }: MovieDetailModalProps) => {
  const posterUrl = movie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=No+Image';

  const backdropUrl = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}시간 ${mins}분`;
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {isLoading && (
        <div className="flex items-center justify-center p-16">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-slate-400 rounded-full animate-spin opacity-30"></div>
          </div>
          <span className="ml-4 text-slate-600 font-medium text-lg">영화 정보를 불러오는 중...</span>
        </div>
      )}

      {error && (
        <div className="p-16 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-slate-700 text-xl font-medium mb-2">오류가 발생했습니다</p>
          <p className="text-slate-500">{error}</p>
        </div>
      )}

      {movie && !isLoading && !error && (
        <div className="relative">
          {/* Backdrop image with gradient overlay */}
          {backdropUrl && (
            <div className="relative h-80 overflow-hidden">
              <div 
                className="h-full bg-cover bg-center bg-no-repeat transform scale-105"
                style={{ backgroundImage: `url(${backdropUrl})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
            </div>
          )}

          <div className="p-8 md:p-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Poster */}
              <div className="flex-shrink-0 lg:w-80">
                <div className="relative group">
                  <img
                    src={posterUrl}
                    alt={movie.title}
                    className="w-full h-auto min-w-full mx-auto lg:mx-0 rounded-2xl shadow-2xl object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              {/* Movie Details */}
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-3 leading-tight">
                    {movie.title}
                  </h1>
                  
                  {movie.tagline && (
                    <p className="text-xl text-slate-600 italic font-light mb-6">
                      "{movie.tagline}"
                    </p>
                  )}
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center bg-gradient-to-r from-yellow-100 to-yellow-200 px-4 py-2 rounded-full">
                    <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-yellow-700 font-semibold">
                      {movie.vote_average.toFixed(1)}/10
                    </span>
                  </div>
                  
                  <div className="bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-2 rounded-full">
                    <span className="text-slate-700 font-medium">
                      {movie.release_date}
                    </span>
                  </div>
                  
                  {movie.runtime > 0 && (
                    <div className="bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-2 rounded-full">
                      <span className="text-slate-700 font-medium">
                        {formatRuntime(movie.runtime)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                {movie.genres.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800 mb-3">장르</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Overview */}
                <div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-4">줄거리</h3>
                  <p className="text-slate-700 leading-relaxed text-lg">
                    {movie.overview || '줄거리 정보가 없습니다.'}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 pt-6 border-t border-slate-200/50">
                  {movie.budget > 0 && (
                    <div className="bg-slate-50/50 rounded-xl p-4 text-center min-w-0">
                      <div className="text-lg lg:text-xl font-bold text-slate-700 mb-1 truncate">
                        {formatCurrency(movie.budget)}
                      </div>
                      <div className="text-sm text-slate-500 font-medium">제작비</div>
                    </div>
                  )}
                  
                  {movie.revenue > 0 && (
                    <div className="bg-slate-50/50 rounded-xl p-4 text-center min-w-0">
                      <div className="text-lg lg:text-xl font-bold text-slate-700 mb-1 truncate">
                        {formatCurrency(movie.revenue)}
                      </div>
                      <div className="text-sm text-slate-500 font-medium">수익</div>
                    </div>
                  )}
                  
                  <div className="bg-slate-50/50 rounded-xl p-4 text-center min-w-0">
                    <div className="text-lg lg:text-xl font-bold text-slate-700 mb-1 truncate">
                      {movie.popularity.toFixed(1)}
                    </div>
                    <div className="text-sm text-slate-500 font-medium">인기도</div>
                  </div>
                  
                  <div className="bg-slate-50/50 rounded-xl p-4 text-center min-w-0">
                    <div className="text-lg lg:text-xl font-bold text-slate-700 mb-1 truncate">
                      {movie.vote_count.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-500 font-medium">투표 수</div>
                  </div>
                </div>

                {/* Homepage Link */}
                {movie.homepage && (
                  <div className="pt-6">
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 text-white font-medium rounded-xl hover:from-slate-800 hover:to-slate-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      <span>공식 홈페이지 방문</span>
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default memo(MovieDetailModal); 