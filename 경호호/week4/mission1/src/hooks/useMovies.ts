import useFetch from './useFetch';
import { MovieApiResponse } from '../types/movie';
import { getCategoryPath } from '../services/movieService';

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

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
    totalPages: data ? Math.min(data.total_pages, 500) : 0,
    loading,
    error,
    refetch,
  };
};

export default useMovies;
