import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axiosInstance from '../lib/axiosInstance';

interface User {
  id: string;
  nickname: string;
  name?: string;
  profileImage?: string;
}

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isLoggedIn: boolean;
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  socialLogin: (tokens: { accessToken: string; refreshToken: string }) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const getAccessTokenFromStorage = (): string | null => {
  try {
    const token = localStorage.getItem('accessToken');
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error('토큰 파싱 중 오류:', error);
    localStorage.removeItem('accessToken');
    return null;
  }
};

const setAccessTokenInStorage = (token: string): void => {
  localStorage.setItem('accessToken', JSON.stringify(token));
};

const removeAccessTokenFromStorage = (): void => {
  localStorage.removeItem('accessToken');
};

const getRefreshTokenFromStorage = (): string | null => {
  try {
    const token = localStorage.getItem('refreshToken');
    return token ? JSON.parse(token) : null;
  } catch (error) {
    console.error('리프레시 토큰 파싱 중 오류:', error);
    localStorage.removeItem('refreshToken');
    return null;
  }
};

const setRefreshTokenInStorage = (token: string): void => {
  localStorage.setItem('refreshToken', JSON.stringify(token));
};

const removeRefreshTokenFromStorage = (): void => {
  localStorage.removeItem('refreshToken');
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(() => getAccessTokenFromStorage());
  const [refreshToken, setRefreshToken] = useState<string | null>(() => getRefreshTokenFromStorage());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!accessToken);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);
  
  // 사용자 정보 가져오기
  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const response = await axiosInstance.get('/v1/users/me');
          const userData = response.data.data || response.data;
          setUser(userData);
        } catch (error) {
          console.error('사용자 정보 가져오기 실패:', error);
        }
      } else {
        setUser(null);
      }
    };

    fetchUserData();
  }, [accessToken]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      console.log('signin 요청 보냄:', { email, password });
      const response = await axiosInstance.post('/v1/auth/signin', { email, password });
      console.log('signin 응답:', response);
      console.log('signin 응답 데이터:', response.data);
      // API 응답이 { data: { accessToken, refreshToken } } 또는 { accessToken, refreshToken } 일 수 있으므로 처리
      const respData = response.data as any;
      const payload = respData.data ?? respData;
      const newAccessToken = payload.accessToken;
      const newRefreshToken = payload.refreshToken;
      
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      setAccessTokenInStorage(newAccessToken);
      setRefreshTokenInStorage(newRefreshToken);
      
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      if (accessToken) {
        await axiosInstance.post('/v1/auth/signout');
      }
    } catch (error) {
      console.error('로그아웃 API 호출 중 오류:', error);
    } finally {
      setAccessToken(null);
      setRefreshToken(null);
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  };

  const socialLogin = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }): void => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setAccessTokenInStorage(accessToken);
    setRefreshTokenInStorage(refreshToken);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  };

  const value = {
    accessToken,
    refreshToken,
    isLoggedIn,
    isAuthenticated: !!accessToken,
    user,
    login,
    logout,
    socialLogin
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};