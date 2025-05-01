import { useEffect, useState } from 'react';
import type { FC } from 'react';
import { MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Pagination from '../components/Pagination';
import useCustomFetch from '../hooks/useCustomFetch';

const NowPlayingPage: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=${currentPage}`;
  
  const { data, isLoading, isError, error } = useCustomFetch<MovieResponse>(url);

  useEffect(() => {
    if (data) {
      setTotalPages(Math.min(data.total_pages, 500)); // TMDB API는 최대 500페이지까지만 제공
    }
  }, [data]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    return <ErrorMessage message={error || '현재 상영 중인 영화 데이터를 불러오는 중 오류가 발생했습니다.'} />;
  }

  return (
    <div>
      <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default NowPlayingPage;