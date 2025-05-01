import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axiosInstance from '../lib/axiosInstance';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const MyPage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get('/users/me');
        setUser(response.data);
      } catch (err: any) {
        setError('사용자 정보를 가져오는데 실패했습니다.');
        console.error('사용자 정보 가져오기 실패:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-100 p-4 rounded">
        {error}
      </div>
    );
  }
  
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
      <h1 className="text-2xl font-bold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">마이 페이지</h1>
      
      <div className="bg-gray-700 p-4 rounded-lg mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full" />
            ) : (
              user?.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-400">{user?.email}</p>
          </div>
        </div>
        
        <div className="border-t border-gray-600 pt-4">
          <h3 className="text-lg font-medium mb-2">내 계정 정보</h3>
          <p><span className="text-gray-400">ID:</span> {user?.id}</p>
        </div>
      </div>
      
      <button
        onClick={handleLogout}
        className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
      >
        로그아웃
      </button>
    </div>
  );
};

export default MyPage; 