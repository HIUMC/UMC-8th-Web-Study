import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const Header = () => {
  const { user, isAuthenticated } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">LP 플랫폼</Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm">{user?.nickname}님 반갑습니다.</span>
              <Link to="/users/me" className="text-sm hover:text-gray-300">마이페이지</Link>
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
