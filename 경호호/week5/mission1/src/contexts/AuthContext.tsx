import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axiosInstance from '../lib/axiosInstance';

// 인증 상태와 함수들의 타입 정의
interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// 기본값으로 초기화된 Auth 컨텍스트 생성
const AuthContext = createContext<AuthContextType | null>(null);

// 로컬 스토리지 관련 함수들
const getAccessTokenFromStorage = (): string | null => {
  const token = localStorage.getItem('accessToken');
  return token ? JSON.parse(token) : null;
};

const setAccessTokenInStorage = (token: string): void => {
  localStorage.setItem('accessToken', JSON.stringify(token));
};

const removeAccessTokenFromStorage = (): void => {
  localStorage.removeItem('accessToken');
};

const getRefreshTokenFromStorage = (): string | null => {
  const token = localStorage.getItem('refreshToken');
  return token ? JSON.parse(token) : null;
};

const setRefreshTokenInStorage = (token: string): void => {
  localStorage.setItem('refreshToken', JSON.stringify(token));
};

const removeRefreshTokenFromStorage = (): void => {
  localStorage.removeItem('refreshToken');
};

// AuthProvider 컴포넌트 구현
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState<string | null>(() => getRefreshTokenFromStorage());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!accessToken);

  // accessToken이 변경될 때마다 isLoggedIn 상태 업데이트
  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);

  // 로그인 함수
  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await axiosInstance.post('/v1/auth/signin', { email, password });
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data;
      
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      setAccessTokenInStorage(newAccessToken);
      setRefreshTokenInStorage(newRefreshToken);
      
      // axios 인스턴스의 기본 헤더에 토큰 설정
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  };

  // 로그아웃 함수
  const logout = async (): Promise<void> => {
    try {
      // 백엔드 로그아웃 API 호출 (필요시)
      if (accessToken) {
        await axiosInstance.post('/v1/auth/signout');
      }
    } catch (error) {
      console.error('로그아웃 API 호출 중 오류:', error);
    } finally {
      // 로컬 상태 및 저장소 초기화
      setAccessToken(null);
      setRefreshToken(null);
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      
      // axios 인스턴스의 Authorization 헤더 제거
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  };

  // 컨텍스트 값 객체
  const value = {
    accessToken,
    refreshToken,
    isLoggedIn,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// useAuth 커스텀 훅
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 