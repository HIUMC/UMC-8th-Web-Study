import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../lib/axiosInstance';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  bio?: string | null;
  avatar?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

const UserDetailPage = () => {
  const { userId: paramId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [searchId, setSearchId] = useState<string>(paramId || '');
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchUser = async (id: string) => {
    if (!id) return;
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.get(`/v1/users/${id}`);
      setUser(response.data.data);
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 404) {
        setError('사용자를 찾을 수 없습니다.');
      } else {
        setError('사용자 정보 불러오기 실패');
      }
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (paramId) fetchUser(paramId);
  }, [paramId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUser(searchId);
  };

  if (loading) return <div className="flex justify-center items-center h-64">로딩중...</div>;

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700 text-white">
      <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mb-4">
        뒤로가기
      </button>
      <h1 className="text-2xl font-bold text-center mb-6">다른 사용자 조회</h1>
      <form onSubmit={handleSearch} className="flex mb-4">
        <input
          type="text"
          placeholder="사용자 ID 입력"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="flex-grow px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="px-4 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white rounded-r-md"
        >조회</button>
      </form>
      {error && <div className="text-red-400 mb-4">{error}</div>}
      <div>
        <p><span className="text-gray-400">ID:</span> {user?.id ?? '-'}</p>
        <p><span className="text-gray-400">이름:</span> {user?.name ?? '-'}</p>
        <p><span className="text-gray-400">이메일:</span> {user?.email ?? '-'}</p>
      </div>
    </div>
  );
};

export default UserDetailPage; 