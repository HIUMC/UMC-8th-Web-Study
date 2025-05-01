import { useState } from 'react';
import axiosInstance from '../lib/axiosInstance';
import { useNavigate } from 'react-router-dom';

const UserEditPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEdit = async () => {
    setLoading(true);
    try {
      await axiosInstance.patch('/v1/users', { name, email });
      navigate('/users/me');
    } catch (err: any) {
      console.error(err);
      setError('정보 수정 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700 text-white">
      <h1 className="text-2xl font-bold text-center mb-6">정보 수정</h1>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-gray-700 placeholder-gray-400 text-white"
      />
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full mb-4 p-2 rounded bg-gray-700 placeholder-gray-400 text-white"
      />
      <button
        onClick={handleEdit}
        disabled={loading}
        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
      >
        {loading ? '수정 중...' : '정보 수정'}
      </button>
    </div>
  );
};

export default UserEditPage; 