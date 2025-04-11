import useFetch from './useFetch';
import { MovieApiResponse } from '../types/movie';
import { getCategoryPath } from '../services/movieService';

// API_KEY와 BASE_URL 정의 제거

const useMovies = (
  category: string,
  page: number = 1,
  language: string = 'ko-KR'
) => {
  console.log(`[useMovies] Hook called with category: ${category}, page: ${page}`); // 로그 추가
  const categoryPath = getCategoryPath(category);
  // 상대 경로만 사용
  const url = `/movie/${categoryPath}`; 
  
  // headers 옵션 제거, params만 전달
  const { data, loading, error, refetch } = useFetch<MovieApiResponse>(url, {
    params: {
      language,
      page,
    },
  });

  // useFetch 결과 로그 추가
  console.log(`[useMovies] useFetch result - loading: ${loading}, error: ${error}, data received: ${!!data}`);

  return {
    movies: data?.results || [],
    totalPages: data ? Math.min(data.total_pages, 500) : 0,
    loading,
    error,
    refetch,
  };
};

export default useMovies;
