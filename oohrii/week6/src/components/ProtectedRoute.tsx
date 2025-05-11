import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

const ProtectedRoute = () => {
  const { isAuthenticated, accessToken } = useAuth();

  useEffect(() => {
    console.log('ProtectedRoute - 인증 상태:', { isAuthenticated, accessToken });
  }, [isAuthenticated, accessToken]);

  // accessToken이 있는지도 함께 확인
  if (!isAuthenticated || !accessToken) {
    console.log('ProtectedRoute - 인증되지 않은 접근, 로그인 페이지로 리다이렉트');
    return <Navigate to="/login" replace />;
  }

  console.log('ProtectedRoute - 인증된 접근 허용');
  return <Outlet />;
};

export default ProtectedRoute; 