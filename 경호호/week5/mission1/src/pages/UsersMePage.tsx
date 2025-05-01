import { useState, useEffect } from 'react';
import axiosInstance from '../lib/axiosInstance';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

const UsersMePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/v1/users/me');
        setUser(response.data);
      } catch (err: any) {
        console.error(err);
        setError('내 정보 불러오기 실패');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">로딩중...</div>;
  }
  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700 text-white">
      <h1 className="text-2xl font-bold text-center mb-6">내 정보</h1>
      <p>ID: {user?.id}</p>
      <p>이름: {user?.name}</p>
      <p>이메일: {user?.email}</p>
    </div>
  );
};

export default UsersMePage; 