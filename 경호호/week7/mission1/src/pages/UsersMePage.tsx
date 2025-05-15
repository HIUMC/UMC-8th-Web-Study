import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useQuery } from '@tanstack/react-query';
import { getUserProfile, UserProfile } from '../api/user';
import { Edit, Trash } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const UsersMePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { data: user, isLoading, isError } = useQuery(
    ['userProfile'],
    getUserProfile,
    {
      staleTime: 1000 * 60 * 5, // 5분간 캐싱
      retry: 1,
    }
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleLogout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      await logout();
      navigate('/');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          )}
          
          {isError && (
            <div className="p-6 text-center">
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-4 rounded-md">
                사용자 정보를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
              </div>
            </div>
          )}
          
          {user && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">마이페이지</h1>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => navigate('/users/edit')}
                    className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                    title="프로필 수정"
                  >
                    <Edit size={20} className="text-white" />
                  </button>
                  <button 
                    onClick={() => navigate('/users/delete')}
                    className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                    title="회원 탈퇴"
                  >
                    <Trash size={20} className="text-white" />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-6 mb-8">
                <div className="h-24 w-24 bg-purple-600 rounded-full flex items-center justify-center text-3xl font-bold uppercase text-white mx-auto md:mx-0">
                  {user.profileImage ? (
                    <img src={user.profileImage} alt={user.name} className="h-24 w-24 rounded-full object-cover" />
                  ) : (
                    user.name?.charAt(0) || user.nickname?.charAt(0) || '?'
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-2xl font-semibold">{user.name || user.nickname}</h2>
                  <p className="text-gray-300 mb-2">{user.email}</p>
                  <p className="text-gray-400 text-sm">가입일: {formatDate(user.createdAt)}</p>
                </div>
              </div>
              
              <div className="bg-gray-700 p-4 rounded-md mb-6">
                <h3 className="text-lg font-semibold mb-2">상세 정보</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <p><span className="text-gray-400">ID:</span> {user.id}</p>
                  <p><span className="text-gray-400">닉네임:</span> {user.nickname || '-'}</p>
                  <p><span className="text-gray-400">Bio:</span> {user.bio || '-'}</p>
                  <p><span className="text-gray-400">정보 수정일:</span> {formatDate(user.updatedAt)}</p>
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={handleLogout}
                  className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-md transition-colors"
                >
                  로그아웃
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UsersMePage; 