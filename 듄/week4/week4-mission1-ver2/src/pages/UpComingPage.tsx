import type { FC } from 'react';
import { MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import useCustomFetch from '../hooks/useCustomFetch';

const UpComingPage: FC = () => {
  const url = 'https://api.themoviedb.org/3/movie/upcoming?language=ko-KR&page=1';
  
  const { data, isLoading, isError, error } = useCustomFetch<MovieResponse>(url);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !data) {
    return <ErrorMessage message={error || '개봉 예정 영화 데이터를 불러오는 중 오류가 발생했습니다.'} />;
  }

  return (
    <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
      {data.results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default UpComingPage;