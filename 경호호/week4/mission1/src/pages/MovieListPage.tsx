import { useState } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import Pagination from '../components/Pagination';
import { getCategoryTitle } from '../services/movieService';
import useMovies from '../hooks/useMovies';

const MovieListPage = () => {
  console.log('[MovieListPage] Rendering...');
  const { category = 'popular' } = useParams<{ category: string }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { movies, totalPages, loading, error } = useMovies(category, currentPage);

  // 훅 상태 로그 추가
  console.log(`[MovieListPage] State from useMovies - loading: ${loading}, error: ${error}, movies count: ${movies.length}, totalPages: ${totalPages}`);

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  const categoryTitle = getCategoryTitle(category);

  // 렌더링 조건 로그 추가
  if (loading) console.log('[MovieListPage] Rendering LoadingSpinner');
  if (error) console.log(`[MovieListPage] Rendering ErrorDisplay with message: ${error}`);
  if (!loading && !error && movies.length === 0) console.log('[MovieListPage] Rendering No Movies message');
  if (!loading && !error && movies.length > 0) console.log(`[MovieListPage] Rendering ${movies.length} MovieCards`);

  return (
    <div className="animate-fadeIn">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-8">{categoryTitle}</h1>
      
      {loading && <LoadingSpinner />}
      
      {error && <ErrorDisplay message={error} />}
      
      {!loading && !error && movies.length === 0 && (
        <div className="text-center text-xl mt-10">
          표시할 영화가 없습니다.
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-6">
        {!loading && !error && movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
      
      {!loading && !error && movies.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default MovieListPage;
