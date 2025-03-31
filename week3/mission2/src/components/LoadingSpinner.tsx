const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-lg font-medium text-gray-700">로딩 중...</p>
    </div>
  );
};

export default LoadingSpinner; 