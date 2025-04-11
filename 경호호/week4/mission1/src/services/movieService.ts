import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
