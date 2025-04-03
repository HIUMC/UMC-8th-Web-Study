import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Movie } from '../types/movie';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorDisplay from '../components/ErrorDisplay';
import Pagination from '../components/Pagination';
import { fetchMovies, getCategoryPath, getCategoryTitle } from '../services/movieService';

const MovieListPage = () => {
  const { category = 'popular' } = useParams<{ category: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const getMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const categoryPath = getCategoryPath(category);
        const data = await fetchMovies(categoryPath, currentPage);
        
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 500)); // TMDB API는 최대 500페이지까지 제공
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.message || err.message
            : '영화 데이터를 불러오는 중 오류가 발생했습니다.'
        );
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [category, currentPage]);

  const handlePageChange = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentPage(page);
  };

  const categoryTitle = getCategoryTitle(category);

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