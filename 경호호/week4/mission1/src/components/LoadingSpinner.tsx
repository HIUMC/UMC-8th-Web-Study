const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center my-10">
      <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-blue-500 border-t-transparent"></div>
      <span className="mt-4 text-base sm:text-lg font-medium text-gray-700">영화 정보를 불러오는 중...</span>
    </div>
  );
};

export default LoadingSpinner; 