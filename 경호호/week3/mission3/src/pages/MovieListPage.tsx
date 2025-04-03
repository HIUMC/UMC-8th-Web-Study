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

// 카테고리별 배경 색상 매핑
const CATEGORY_COLORS: Record<string, { bg: string, text: string }> = {
  popular: { bg: 'from-indigo-900 to-indigo-700', text: 'text-indigo-100' },
  upcoming: { bg: 'from-teal-900 to-teal-700', text: 'text-teal-100' },
  top_rated: { bg: 'from-amber-900 to-amber-700', text: 'text-amber-100' },
  now_playing: { bg: 'from-rose-900 to-rose-700', text: 'text-rose-100' }
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

  // 현재 카테고리의 제목과 색상
  const title = CATEGORY_TITLES[category] || '영화 목록';
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.popular;

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 text-gray-100">
      {/* 배경 그라데이션 */}
      <div className={`fixed inset-0 -z-10 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900`} />
      
      {/* 헤더 섹션 */}
      <div className={`w-full py-12 mb-8 bg-gradient-to-r ${colors.bg}`}>
        <div className="w-full px-8">
          <h1 className={`text-4xl md:text-5xl font-bold ${colors.text}`}>{title}</h1>
          <p className={`mt-3 text-lg md:text-xl ${colors.text} opacity-80`}>
            {category === 'popular' && '전 세계적으로 지금 가장 인기 있는 영화 목록입니다.'}
            {category === 'upcoming' && '곧 개봉할 기대작 영화 목록입니다.'}
            {category === 'top_rated' && '역대 최고 평점을 받은 영화 목록입니다.'}
            {category === 'now_playing' && '현재 극장에서 상영 중인 영화 목록입니다.'}
          </p>
        </div>
      </div>
      
      {/* 영화 목록 */}
      <div className="w-full px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {/* 페이지네이션 */}
        <div className="mt-12">
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default MovieListPage; 