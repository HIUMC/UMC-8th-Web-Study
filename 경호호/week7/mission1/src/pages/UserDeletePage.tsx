import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useMutation } from '@tanstack/react-query';
import { deleteUser } from '../api/user';
import { useAuth } from '../contexts/AuthContext';

const UserDeletePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [confirmText, setConfirmText] = useState('');
  const [error, setError] = useState('');

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      await logout();
      navigate('/signin');
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || '회원 탈퇴 중 오류가 발생했습니다.');
    }
  });

  const handleDelete = () => {
    if (confirmText !== '회원탈퇴') {
      setError('확인 문구가 일치하지 않습니다.');
      return;
    }
    
    deleteUserMutation.mutate();
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-2xl py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-red-500">회원 탈퇴</h1>
              <button 
                onClick={() => navigate('/users/me')}
                className="text-gray-400 hover:text-white"
              >
                취소
              </button>
            </div>
            
            <div className="bg-gray-700 p-4 rounded-md mb-6">
              <h3 className="text-lg font-semibold mb-2 text-red-400">주의사항</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-300">
                <li>계정을 삭제하면 모든 데이터가 영구적으로 제거됩니다.</li>
                <li>작성한 LP, 댓글 등 모든 활동 내역이 삭제됩니다.</li>
                <li>이 작업은 되돌릴 수 없습니다.</li>
              </ul>
            </div>
            
            {error && (
              <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-4 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <div className="mb-6">
              <label htmlFor="confirmText" className="block text-sm font-medium text-gray-300 mb-1">
                계속하려면 <span className="font-bold text-red-400">회원탈퇴</span>를 입력하세요
              </label>
              <input
                id="confirmText"
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <button
              onClick={handleDelete}
              disabled={confirmText !== '회원탈퇴' || deleteUserMutation.isLoading}
              className={`w-full py-3 font-medium rounded-md transition-colors ${
                confirmText !== '회원탈퇴' || deleteUserMutation.isLoading
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800'
              }`}
            >
              {deleteUserMutation.isLoading ? '처리 중...' : '회원 탈퇴 확인'}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDeletePage; 