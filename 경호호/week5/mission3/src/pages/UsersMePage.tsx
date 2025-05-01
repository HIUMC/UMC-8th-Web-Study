import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axiosInstance';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  bio?: string | null;
  avatar?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

const UsersMePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/v1/users/me');
        setUser(response.data.data);
      } catch (err: any) {
        console.error(err);
        setError('내 정보 불러오기 실패');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64">로딩중...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-6 rounded-xl shadow-lg w-full max-w-md mx-auto text-white">
      <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mb-4">
        뒤로가기
      </button>
      <h1 className="text-3xl font-bold text-center mb-6">내 정보</h1>
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-16 w-16 bg-purple-600 rounded-full flex items-center justify-center text-xl font-bold uppercase text-white">
          {user?.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-16 w-16 rounded-full object-cover" />
          ) : (
            user?.name.charAt(0)
          )}
        </div>
        <div className="text-left">
          <h2 className="text-xl font-semibold">{user?.name}</h2>
          <p className="text-gray-300">{user?.email}</p>
        </div>
      </div>
      <div className="space-y-2">
        <p><span className="text-gray-400">ID:</span> {user?.id}</p>
        <p><span className="text-gray-400">Bio:</span> {user?.bio ?? '-'}</p>
        <p><span className="text-gray-400">가입일:</span> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}</p>
      </div>
    </div>
  );
};

export default UsersMePage; 