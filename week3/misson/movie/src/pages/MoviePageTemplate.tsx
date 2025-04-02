// components/MoviePageTemplate.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Movie, MovieResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import { useParams } from 'react-router-dom';
import NotFound from './not-found';

export default function MoviePageTemplate() {
  const { categoryType } = useParams<{ categoryType: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${categoryType}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );

      setMovies(data.results);
      setTotalPages(data.total_pages);
      setIsLoading(false);
    };

    fetchData();
  }, [page, categoryType]);

  if (!['popular', 'top_rated', 'upcoming', 'now_playing'].includes(categoryType ?? '')) {
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
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 disabled:opacity-40 text-white"
        >
          다음 ▶
        </button>
      </div>

      {/* 영화 목록 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 p-4">
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
