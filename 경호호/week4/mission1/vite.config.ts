import { defineConfig } from 'vite'
// 중복된 import 제거
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: { // server 옵션 추가
    proxy: {
      // '/api/tmdb' 경로로 시작하는 요청을 TMDB API로 프록시
      '/api/tmdb': {
        target: 'https://api.themoviedb.org/3', // 실제 API 서버 주소
        changeOrigin: true, // 대상 서버의 호스트 헤더를 변경
        rewrite: (path) => path.replace(/^\/api\/tmdb/, ''), // 요청 경로에서 '/api/tmdb' 제거
        secure: false, // HTTPS가 아닌 경우에도 프록시 허용 (필요시)
      },
    },
  },
});
