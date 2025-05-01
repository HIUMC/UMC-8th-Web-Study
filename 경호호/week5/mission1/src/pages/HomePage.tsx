import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const { isLoggedIn } = useAuth();

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-lg text-center border border-gray-700">
      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
        Protected Route 구현 데모
      </h1>
      
      <p className="text-gray-300 mb-8">
        이 애플리케이션은 JWT를 사용하여 인증 시스템을 구현하고,<br />
        Protected Route를 통해 인증된 사용자만 접근할 수 있는 페이지를 제공합니다.
      </p>
      
      <div className="grid gap-4">
        {isLoggedIn ? (
          <>
            <Link
              to="/my-page"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
            >
              마이 페이지로 이동
            </Link>
            <div className="text-green-400 font-medium mt-4">
              현재 로그인 상태입니다!
            </div>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
            >
              로그인
            </Link>
            <Link
              to="/signup"
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
            >
              회원가입
            </Link>
            <Link
              to="/my-page"
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300 mt-4"
            >
              마이 페이지 접근 시도 (리디렉션 확인)
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
