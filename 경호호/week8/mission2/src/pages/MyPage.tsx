import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../api/user';
import { Layout } from '../components/layout/Layout';
import { Settings } from 'lucide-react';
import { QUERY_KEYS } from '../constants/queryKeys';

const MyPage = () => {
  const { logout, user: authUser } = useAuth();
  const navigate = useNavigate();
  
  const { data: user, isLoading, error } = useQuery(
    ['userProfile'],
    getUserProfile,
    {
      staleTime: 1000 * 60 * 5, // 5분간 캐싱
      retry: 1,
    }
  );
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };
  
  const handleEditProfile = () => {
    navigate('/users/edit');
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </Layout>
    );
  }
  
  if (error) {
    return (
      <Layout>
        <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-100 p-4 rounded">
          사용자 정보를 가져오는데 실패했습니다.
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto max-w-2xl py-8">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gray-700">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">마이 페이지</h1>
            <button
              onClick={handleEditProfile}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
            >
              <Settings size={16} />
              프로필 수정
            </button>
          </div>
          
          <div className="bg-gray-700 p-6 rounded-lg mb-6">
            <div className="flex items-center space-x-6 mb-6">
              <div className="h-24 w-24 bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold overflow-hidden">
                {user?.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="h-24 w-24 object-cover" />
                ) : (
                  <span className="uppercase">{user?.name?.charAt(0) || user?.nickname?.charAt(0) || '?'}</span>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">{user?.name || authUser?.name}</h2>
                <p className="text-gray-400">@{user?.nickname || authUser?.nickname}</p>
                {user?.bio && (
                  <p className="mt-2 text-gray-300">{user.bio}</p>
                )}
              </div>
            </div>
            
            <div className="border-t border-gray-600 pt-4">
              <h3 className="text-lg font-medium mb-2">내 계정 정보</h3>
              <p><span className="text-gray-400">이메일:</span> {user?.email}</p>
              <p><span className="text-gray-400">가입일:</span> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ko-KR') : '정보 없음'}</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            로그아웃
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MyPage; 