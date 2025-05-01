import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl max-w-lg text-center border border-gray-700">
      <h1 className="text-3xl font-bold mb-6">UMC WEB WEEK 5</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/signin"
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          로그인
        </Link>
        <Link
          to="/signup"
          className="bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          회원가입
        </Link>
        <Link
          to="/users/me"
          className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          내 정보 조회
        </Link>
        <Link
          to="/users/1"
          className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          다른 사용자 정보 조회
        </Link>
        <Link
          to="/users/delete"
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          회원 탈퇴
        </Link>
        <Link
          to="/users/edit"
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-medium py-3 px-6 rounded-md transition-colors duration-300"
        >
          유저 정보 수정
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
