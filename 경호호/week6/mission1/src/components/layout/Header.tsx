import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md w-full">
      <div className="flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">UMC Week 6 - LP Platform </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">{user?.nickname || user?.name || "회원"}님 반갑습니다.</span>
              <button 
                onClick={async () => {
                  try {
                    await logout();
                    navigate('/');
                  } catch (err) {
                    console.error('로그아웃 오류:', err);
                  }
                }} 
                className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/signin" className="text-sm hover:text-gray-300">로그인</Link>
              <Link to="/signup" className="bg-purple-600 px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors">회원가입</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
