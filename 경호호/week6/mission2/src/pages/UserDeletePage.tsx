import React, { useState } from 'react';
import axiosInstance from '../lib/axiosInstance';
import { useNavigate } from 'react-router-dom';

const UserDeletePage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axiosInstance.delete('/v1/users');
      navigate('/signin');
    } catch (err: any) {
      console.error(err);
      setError('회원 탈퇴 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700 text-white">
      <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white mb-4">
        뒤로가기
      </button>
      <h1 className="text-2xl font-bold text-center mb-6">회원 탈퇴</h1>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      <button
        onClick={handleDelete}
        disabled={loading}
        className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-300"
      >
        {loading ? '탈퇴 진행중...' : '회원 탈퇴하기'}
      </button>
    </div>
  );
};

export default UserDeletePage; 