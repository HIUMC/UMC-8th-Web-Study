import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Movie, MovieApiResponse } from '../types/movie';
import MovieCard from '../components/MovieCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Pagination from '../components/Pagination';

// 카테고리 타입에 따른 API 경로 매핑
const CATEGORY_ENDPOINTS: Record<string, string> = {
  popular: 'popular',
  upcoming: 'upcoming',
  top_rated: 'top_rated',
  now_playing: 'now_playing'
};

// 카테고리 타입에 따른 한글 제목 매핑
const CATEGORY_TITLES: Record<string, string> = {
  popular: '인기 영화',
  upcoming: '개봉 예정 영화',
  top_rated: '평점 높은 영화',
  now_playing: '현재 상영 중인 영화'
};

const MovieListPage = () => {
  const { category = 'popular' } = useParams<{ category: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // 카테고리에 해당하는 엔드포인트 사용
        const endpoint = CATEGORY_ENDPOINTS[category] || 'popular';
        
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${endpoint}?language=ko-KR&page=${currentPage}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        if (!response.ok) {
          throw new Error('영화 데이터를 불러오는데 실패했습니다.');
        }

        const data: MovieApiResponse = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // TMDB API는 최대 500 페이지로 제한
      } catch (err) {
        setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [category, currentPage]);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 현재 카테고리의 제목
  const title = CATEGORY_TITLES[category] || '영화 목록';

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">{title}</h1>
      
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
};

export default MovieListPage; 