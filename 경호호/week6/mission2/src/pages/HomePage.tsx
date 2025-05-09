import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch {}
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-lg text-center border border-gray-700">
      <h1 className="text-3xl font-bold mb-6">UMC WEB WEEK 5</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
          >
            로그아웃
          </button>
        ) : (
          <Link
            to="/signin"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
          >
            로그인
          </Link>
        )}
        <Link
          to="/signup"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          회원가입
        </Link>
        <Link
          to="/users/me"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          내 정보 조회
        </Link>
        <Link
          to="/users/1"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          다른 사용자 정보 조회
        </Link>
        <Link
          to="/users/delete"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          회원 탈퇴
        </Link>
        <Link
          to="/users/edit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          유저 정보 수정
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
