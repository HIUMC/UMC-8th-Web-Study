import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">페이지를 찾을 수 없습니다</h2>
      <p className="text-xl text-gray-600 mb-8">요청하신 페이지가 존재하지 않거나 삭제되었습니다.</p>
      <Link 
        to="/" 
        className="bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFoundPage; 