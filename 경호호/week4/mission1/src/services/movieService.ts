import axios from 'axios';

// BASE_URL을 프록시 경로로 변경
const BASE_URL = '/api/tmdb'; 
const API_KEY = import.meta.env.VITE_TMDB_KEY;

// API 키 로딩 확인용 로그 추가
console.log('[movieService] VITE_TMDB_KEY:', API_KEY ? 'Loaded' : 'Not Loaded or Empty');
if (!API_KEY) {
  console.error('[movieService] Error: VITE_TMDB_KEY is missing or empty in .env file!');
}

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    // 기본 헤더에 캐시 제어 추가
    'Cache-Control': 'no-store, no-cache, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
});

// apiClient 헤더 확인용 로그 추가
console.log('[movieService] apiClient default headers:', JSON.stringify(apiClient.defaults.headers));

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
