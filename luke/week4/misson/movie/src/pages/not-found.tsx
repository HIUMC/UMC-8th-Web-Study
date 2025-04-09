import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800 px-4">
      
      <p className="text-2xl mb-2">페이지를 찾을 수 없습니다.</p>
      <p className="text-gray-600 mb-6">요청하신 페이지가 존재하지 않거나, 이동되었을 수 있어요.</p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound;
