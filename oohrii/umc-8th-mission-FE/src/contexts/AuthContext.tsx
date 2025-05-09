import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  nickname: string | null;
  login: (accessToken: string, refreshToken: string, nickname: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem('accessToken'));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem('refreshToken'));
  const [nickname, setNickname] = useState<string | null>(localStorage.getItem('nickname'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!accessToken);

  const login = (newAccessToken: string, newRefreshToken: string, newNickname: string) => {
    console.log('AuthContext: 로그인 시도');
    localStorage.setItem('accessToken', newAccessToken);
    localStorage.setItem('refreshToken', newRefreshToken);
    localStorage.setItem('nickname', newNickname);
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    setNickname(newNickname);
    setIsAuthenticated(true);
    console.log('AuthContext: 로그인 완료');
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('nickname');
    setAccessToken(null);
    setRefreshToken(null);
    setNickname(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, accessToken, refreshToken, nickname, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 