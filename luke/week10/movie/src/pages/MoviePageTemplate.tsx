// components/MoviePageTemplate.tsx
import {useState } from 'react';
import { MovieResponse } from '../types/movie';
import { useParams } from 'react-router-dom';

import MovieCard from '../components/MovieCard';
import NotFound from './not-found';

import useCustomFetch from '../hooks/useCustomFetch';

export default function MoviePageTemplate() {
  const { categoryType } = useParams<{ categoryType: string }>();
  const [page, setPage] = useState<number>(1);

  const fetchUrl = `https://api.themoviedb.org/3/movie/${categoryType}?language=ko-KR&page=${page}`;
  const { data : movies, isLoading, isError } = useCustomFetch<MovieResponse>(fetchUrl);

  console.log(fetchUrl);
  if (isError) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className='sr-only'>로딩 중..</span>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40 text-white"
        >
          ◀ 이전
        </button>

        <span className="text-lg font-bold">{page}페이지</span>

        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, movies?.total_pages || 1))}
          disabled={page === movies?.total_pages}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40 text-white"
        >
          다음 ▶
        </button>
      </div>

      {/* 영화 목록 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
        {movies?.results.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
