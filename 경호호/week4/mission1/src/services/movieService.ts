import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// API 요청을 위한 Axios 인스턴스 (API 키정보는 이제 useMovies 훅에서 직접 처리)
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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