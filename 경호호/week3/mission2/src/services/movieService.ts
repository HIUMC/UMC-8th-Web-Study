import axios from 'axios';
import { MovieApiResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export const fetchMovies = async (category: string, page: number = 1, language: string = 'ko-KR'): Promise<MovieApiResponse> => {
  try {
    const response = await apiClient.get(`/movie/${category}`, {
      params: {
        language,
        page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 카테고리에 따라 적절한 경로를 반환하는 함수
export const getCategoryPath = (category: string): string => {
  switch (category) {
    case 'popular':
      return 'popular';
    case 'top-rated':
      return 'top_rated';
    case 'upcoming':
      return 'upcoming';
    case 'now_playing':
      return 'now_playing';
    default:
      return 'popular';
  }
};

// 카테고리에 따라 한글 제목을 반환하는 함수
export const getCategoryTitle = (category: string): string => {
  switch (category) {
    case 'popular':
      return '인기 영화';
    case 'top-rated':
      return '평점 높은 영화';
    case 'upcoming':
      return '개봉 예정 영화';
    case 'now_playing':
      return '상영 중인 영화';
    default:
      return '영화 목록';
  }
}; 