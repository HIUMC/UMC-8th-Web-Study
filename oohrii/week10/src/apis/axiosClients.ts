import axios from "axios";

// 환경 변수 확인
console.log('TMDB Token:', import.meta.env.VITE_TMDB_TOKEN);
console.log('Token length:', import.meta.env.VITE_TMDB_TOKEN?.length);

// 토큰 유효성 검사
const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;
if (!TMDB_TOKEN || TMDB_TOKEN.length < 50) {
    console.error('❌ TMDB 토큰이 유효하지 않습니다!');
    console.error('토큰 길이:', TMDB_TOKEN?.length);
    console.error('토큰 값:', TMDB_TOKEN);
    console.error('올바른 토큰을 .env 파일에 설정해주세요.');
}

export const axiosClient = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
    },
});
