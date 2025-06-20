import { useState, useMemo, useCallback } from 'react';
import axios from 'axios';
import useFetch from '../hooks/useFetch';
import useMovieDetail from '../hooks/useMovieDetail';
import type { MovieResponse, MovieFilterType } from '../types/Movie';
import MovieFilter from '../components/MovieFilter';
import MovieList from '../components/MovieList';
import MovieDetailModal from '../components/MovieDetailModal';

const HomePage = () => {
  const [filters, setFilters] = useState<MovieFilterType>({
    query: '어벤져스',
    include_adult: false,
    language: 'ko-KR',
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log('Homepage 렌더링됨'); // 디버깅용

  // useMemo를 사용하여 options 객체의 참조값을 고정
  const fetchOptions = useMemo<Parameters<typeof axios.get>[1]>(() => ({
    params: {
      query: filters.query,
      include_adult: filters.include_adult,
      language: filters.language,
    },
  }), [filters]);

  const { data, error, isLoading } = useFetch<MovieResponse>('search/movie', fetchOptions);
  const { movie: selectedMovie, isLoading: isMovieLoading, error: movieError, fetchMovieDetail, resetState } = useMovieDetail();

  // useCallback을 사용하여 함수의 참조값을 고정
  const handleChangeFilters = useCallback((newFilters: MovieFilterType) => {
    setFilters(newFilters);
  }, []);

  const handleMovieClick = useCallback((movieId: number) => {
    console.log('영화 클릭됨:', movieId); // 디버깅용
    setIsModalOpen(true);
    fetchMovieDetail(movieId);
  }, [fetchMovieDetail]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    resetState();
  }, [resetState]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin mx-auto mb-4"></div>
            <div 
              className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-slate-400 rounded-full animate-spin mx-auto opacity-30" 
              style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
            ></div>
          </div>
          <p className="text-slate-600 font-medium">영화를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 flex items-center justify-center">
        <div className="text-center bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-slate-200/50">
          <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-slate-700 text-lg font-medium">오류가 발생했습니다</p>
          <p className="text-slate-500 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      {/* 배경 패턴 */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f1f5f9' fill-opacity='0.3'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-clip-text text-transparent mb-4">
              영화 검색
            </h1>
          </div>
          
          {/* 필터 섹션 */}
          <div className="mb-8">
            <MovieFilter onChange={handleChangeFilters} />
          </div>
          
          {/* 결과 섹션 */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-slate-200/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-slate-800">
                검색 결과
              </h2>
              <div className="bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-2 rounded-full">
                <span className="text-slate-600 font-medium text-sm">
                  {data?.total_results?.toLocaleString() || 0}개의 영화
                </span>
              </div>
            </div>
            <MovieList 
              movies={data?.results || []} 
              onMovieClick={handleMovieClick}
            />
          </div>
        </div>
      </div>

      <MovieDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        movie={selectedMovie}
        isLoading={isMovieLoading}
        error={movieError}
      />
    </div>
  );
};

export default HomePage; 