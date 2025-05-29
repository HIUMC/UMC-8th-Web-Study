import axiosInstance from './axios';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI || 'http://localhost:8000/v1/auth/google/callback';

// 환경 변수 로드 확인
console.log('Google Client ID:', GOOGLE_CLIENT_ID);
console.log('Redirect URI:', REDIRECT_URI);

export const getGoogleAuthUrl = () => {
  const scope = 'email profile';
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
  console.log('Generated Auth URL:', authUrl);
  return authUrl;
};

export const handleGoogleCallback = async (code: string) => {
  try {
    const response = await axiosInstance.post('/v1/auth/google/login', { code });
    return response.data;
  } catch (error) {
    console.error('Google 로그인 처리 중 오류 발생:', error);
    throw error;
  }
}; 