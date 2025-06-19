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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">오류가 발생했습니다: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Hello 용코딩 🎬
        </h1>
        
        <MovieFilter onChange={handleChangeFilters} />
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            검색 결과 ({data?.total_results || 0}개)
          </h2>
          <MovieList 
            movies={data?.results || []} 
            onMovieClick={handleMovieClick}
          />
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