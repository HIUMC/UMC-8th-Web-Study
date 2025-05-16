import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, UserMinus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '../../api/user';

// 확인 모달 컴포넌트
const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }: {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full border border-gray-700">
        <h3 className="text-xl font-semibold mb-4 text-center">{message}</h3>
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            예
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // 회원 탈퇴 mutation
  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onMutate: () => {
      setIsDeleting(true);
    },
    onSuccess: () => {
      // 로컬 스토리지 토큰 제거
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      
      // 캐시 데이터 초기화
      queryClient.clear();
      
      // 홈으로 리다이렉트
      navigate('/');
      
      // 페이지 새로고침
      window.location.reload();
    },
    onError: (error: any) => {
      console.error('회원 탈퇴 오류:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    },
    onSettled: () => {
      setIsDeleting(false);
      setShowDeleteModal(false);
    },
  });

  // 회원 탈퇴 확인
  const handleConfirmDelete = () => {
    deleteUserMutation.mutate();
  };

  // 회원 탈퇴 취소
  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-700 p-2 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div 
        ref={sidebarRef}
        className={`h-screen bg-gray-800 text-white w-64 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:relative md:min-h-screen fixed left-0 top-0 z-40 md:sticky`}
      >
        <div className="h-full flex flex-col p-5 overflow-y-auto">
          <h2 className="text-xl font-bold mb-6 mt-10 md:mt-0">카테고리</h2>
          <nav className="flex-grow">
            <ul className="space-y-4">
              <li>
                <Link to="/" className="block py-2 hover:text-purple-400 transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link to="/users/me" className="block py-2 hover:text-purple-400 transition-colors">
                  마이페이지
                </Link>
              </li>
            </ul>
          </nav>
          
          {isAuthenticated && (
            <div className="mt-auto pt-4 border-t border-gray-700">
              <button
                onClick={() => setShowDeleteModal(true)}
                disabled={isDeleting}
                className={`flex items-center w-full py-2 text-left text-red-400 hover:text-red-300 transition-colors ${
                  isDeleting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <UserMinus size={16} className="mr-2" />
                {isDeleting ? '탈퇴 처리 중...' : '탈퇴하기'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 회원 탈퇴 확인 모달 */}
      <ConfirmModal
        isOpen={showDeleteModal}
        message="정말 탈퇴하시겠습니까?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
};
