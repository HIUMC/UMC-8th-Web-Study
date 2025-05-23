import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../lib/axiosInstance';
import { QUERY_KEYS } from '../../constants/queryKeys';

export const Header = () => {
  const { user, isAuthenticated, accessToken } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // 로그아웃 상태 관리
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // 로컬 스토리지에서 토큰 제거
  const removeTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };
  
  const logoutMutation = useMutation({
    mutationFn: () => axiosInstance.post('/v1/auth/signout'),
    onMutate: () => {
      setIsLoggingOut(true);
    },
    onSuccess: () => {
      // 토큰 제거
      removeTokens();
      
      // 캐시된 데이터 초기화
      queryClient.clear();
      
      // axios 인스턴스에서 헤더 제거
      delete axiosInstance.defaults.headers.common['Authorization'];
      
      // 홈으로 리다이렉트
      navigate('/');
      
      // 페이지 새로고침 (상태 완전 초기화)
      window.location.reload();
    },
    onError: (error: any) => {
      console.error('로그아웃 오류:', error);
      // 오류가 발생해도 로컬에서는 로그아웃 처리
      removeTokens();
      navigate('/');
      window.location.reload();
    },
    onSettled: () => {
      setIsLoggingOut(false);
    },
  });

  const handleLogout = () => {
    if (isLoggingOut) return; // 이미 로그아웃 중이면 중복 요청 방지
    
    // 서버에 로그아웃 요청
    if (accessToken) {
      logoutMutation.mutate();
    } else {
      // 토큰이 없을 경우 로컬에서만 처리
      removeTokens();
      queryClient.clear();
      navigate('/');
      window.location.reload();
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md w-full">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">UMC Week 8</Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">{user?.nickname || user?.name || "회원"}님 반갑습니다.</span>
              <button 
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-colors ${
                  isLoggingOut 
                  ? 'bg-gray-600 cursor-not-allowed' 
                  : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {isLoggingOut ? (
                  <>
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>로그아웃 중...</span>
                  </>
                ) : (
                  <>
                    <LogOut size={16} />
                    <span>로그아웃</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/signin" className="text-sm hover:text-gray-300">로그인</Link>
              <Link to="/signup" className="bg-purple-600 px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors">회원가입</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
