const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600">404</h1>
      <p className="text-xl text-gray-700 mt-4">페이지를 찾을 수 없습니다.</p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
      >
        홈으로 돌아가기
      </a>
    </div>
  );
};

export default NotFoundPage;
