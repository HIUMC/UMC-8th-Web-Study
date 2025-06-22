import { useState, useMemo } from 'react';
import useCustomFetch from '../hooks/useCustomFetch';
import MovieCard from '../components/MovieCard';
import NotFound from './not-found';
import {SearchQueryParams, SearchResponse } from '../types/movie';
import React from 'react';

const SearchDetail = React.memo(function SearchDetail({ query, includeAdult, language, page = 1 }: SearchQueryParams) {
  const [currentPage, setCurrentPage] = useState(page);

  // fetchUrl은 params가 바뀔 때만 새로 생성
  const fetchUrl = useMemo(
    () =>
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=${includeAdult}&language=${language}&page=${currentPage}`,
    [query, includeAdult, language, currentPage]
  );
  console.log('fetchUrl:', fetchUrl);
  const { data: movies, isLoading, isError } = useCustomFetch<SearchResponse>(fetchUrl);

  // 영화 리스트도 useMemo로 메모이즈
  const movieList = useMemo(
    () =>
      movies?.results.map((movie) => (
        <div key={movie.id}>
          <MovieCard movie={movie} />
        </div>
      )),
    [movies]
  );

  if (isError) return <NotFound />;
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <span className="sr-only">로딩 중..</span>
      </div>
    );
  }


  return (
    <div className="p-4">
      {/* 페이지네이션 */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40 text-white"
        >
          ◀ 이전
        </button>
        <span className="text-lg font-bold">{currentPage}페이지</span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, movies?.total_pages || 1))
          }
          disabled={currentPage === movies?.total_pages}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40 text-white"
        >
          다음 ▶
        </button>
      </div>
      {/* 영화 목록 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {movieList}
      </div>
    </div>
  );
});

export default SearchDetail;