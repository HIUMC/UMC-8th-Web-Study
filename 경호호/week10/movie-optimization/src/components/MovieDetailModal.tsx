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
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">영화 정보를 불러오는 중...</span>
        </div>
      )}

      {error && (
        <div className="p-8 text-center">
          <p className="text-red-600">오류가 발생했습니다: {error}</p>
        </div>
      )}

      {movie && !isLoading && !error && (
        <div className="relative">
          {/* Backdrop image */}
          {backdropUrl && (
            <div 
              className="h-64 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${backdropUrl})` }}
            >
              <div className="h-full bg-black bg-opacity-50" />
            </div>
          )}

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Poster */}
              <div className="flex-shrink-0">
                <img
                  src={posterUrl}
                  alt={movie.title}
                  className="w-48 h-72 object-cover rounded-lg shadow-lg mx-auto md:mx-0"
                />
              </div>

              {/* Movie Details */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{movie.title}</h1>
                
                {movie.tagline && (
                  <p className="text-lg text-gray-600 italic mb-4">"{movie.tagline}"</p>
                )}

                <div className="flex flex-wrap gap-4 mb-4">
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                    ⭐ {movie.vote_average.toFixed(1)}/10
                  </span>
                  <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                    📅 {movie.release_date}
                  </span>
                  {movie.runtime > 0 && (
                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                      ⏱️ {formatRuntime(movie.runtime)}
                    </span>
                  )}
                </div>

                {/* Genres */}
                {movie.genres.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">장르</h3>
                    <div className="flex flex-wrap gap-2">
                      {movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Overview */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">줄거리</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {movie.overview || '줄거리 정보가 없습니다.'}
                  </p>
                </div>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  {movie.budget > 0 && (
                    <div>
                      <span className="font-semibold">제작비:</span> {formatCurrency(movie.budget)}
                    </div>
                  )}
                  {movie.revenue > 0 && (
                    <div>
                      <span className="font-semibold">수익:</span> {formatCurrency(movie.revenue)}
                    </div>
                  )}
                  <div>
                    <span className="font-semibold">인기도:</span> {movie.popularity.toFixed(1)}
                  </div>
                  <div>
                    <span className="font-semibold">투표 수:</span> {movie.vote_count.toLocaleString()}개
                  </div>
                </div>

                {/* Homepage Link */}
                {movie.homepage && (
                  <div className="mt-4">
                    <a
                      href={movie.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                    >
                      공식 홈페이지 방문
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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