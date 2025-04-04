import useFetch from './useFetch';
import { MovieApiResponse } from '../types/movie';
import { getCategoryPath } from '../services/movieService';

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

/**
 * 영화 데이터를 가져오는 커스텀 훅
 * @param category 영화 카테고리 (popular, top-rated, upcoming, now_playing)
 * @param page 페이지 번호
 * @param language 언어 설정
 * @returns 영화 데이터, 로딩 상태, 에러 정보, refetch 함수
 */
const useMovies = (
  category: string,
  page: number = 1,
  language: string = 'ko-KR'
) => {
  const categoryPath = getCategoryPath(category);
  const url = `${BASE_URL}/movie/${categoryPath}`;
  
  const { data, loading, error, refetch } = useFetch<MovieApiResponse>(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    params: {
      language,
      page,
    },
  });

  return {
    movies: data?.results || [],
    totalPages: data ? Math.min(data.total_pages, 500) : 0, // TMDB API는 최대 500페이지까지 제공
    loading,
    error,
    refetch,
  };
};

export default useMovies; 