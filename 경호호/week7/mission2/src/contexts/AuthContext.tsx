import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import axiosInstance from '../lib/axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants/queryKeys';

interface User {
  id: string;
  nickname: string;
  name?: string;
  profileImage?: string;
}

interface UpdateUserData {
  name?: string;
  nickname?: string;
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
  updateUser: (userData: UpdateUserData) => void;
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

  const queryClient = useQueryClient();

  useEffect(() => {
    setIsLoggedIn(!!accessToken);
  }, [accessToken]);
  

  useEffect(() => {
    const fetchUserData = async () => {
      if (accessToken) {
        try {
          const response = await axiosInstance.get('/v1/users/me');
          const userData = response.data.data || response.data;
          setUser(userData);
          
          // 인증 컨텍스트 데이터 캐시에 저장
          queryClient.setQueryData(QUERY_KEYS.USER.auth(), userData);
        } catch (error) {
          console.error('사용자 정보 가져오기 실패:', error);
        }
      } else {
        setUser(null);
        queryClient.setQueryData(QUERY_KEYS.USER.auth(), null);
      }
    };

    fetchUserData();
  }, [accessToken, queryClient]);

  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      axiosInstance.post('/v1/auth/signin', { email, password }),
    onSuccess: (response: any) => {
      const respData = response.data as any;
      const payload = respData.data ?? respData;
      const newAccessToken = payload.accessToken;
      const newRefreshToken = payload.refreshToken;
      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      setAccessTokenInStorage(newAccessToken);
      setRefreshTokenInStorage(newRefreshToken);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
    },
    onError: (error: any) => {
      console.error('로그인 실패:', error);
    }
  });

  const logoutMutation = useMutation({
    mutationFn: () => axiosInstance.post('/v1/auth/signout'),
    onSuccess: () => {
      setAccessToken(null);
      setRefreshToken(null);
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      delete axiosInstance.defaults.headers.common['Authorization'];
      queryClient.clear();
    },
    onError: (error: any) => {
      console.error('로그아웃 오류:', error);
    }
  });

  const login = async (email: string, password: string): Promise<void> => {
    return loginMutation.mutateAsync({ email, password });
  };

  const logout = async (): Promise<void> => {
    return logoutMutation.mutateAsync();
  };

  const socialLogin = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }): void => {
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
    setAccessTokenInStorage(accessToken);
    setRefreshTokenInStorage(refreshToken);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  };
  
  // 사용자 정보 업데이트 함수
  const updateUser = (userData: UpdateUserData): void => {
    if (!user) return;
    
    // 업데이트된 user 객체 생성
    const updatedUser = {
      ...user,
      ...userData
    };
    
    // 로컬 상태 업데이트
    setUser(updatedUser);
    
    // 캐시에도 업데이트된 사용자 정보 저장
    queryClient.setQueryData(QUERY_KEYS.USER.auth(), updatedUser);
  };

  const value = {
    accessToken,
    refreshToken,
    isLoggedIn,
    isAuthenticated: !!accessToken,
    user,
    login,
    logout,
    socialLogin,
    updateUser
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