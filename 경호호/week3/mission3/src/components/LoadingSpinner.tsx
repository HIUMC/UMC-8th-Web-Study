const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-gray-900/50 z-50">
      <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/5 shadow-2xl">
        <div className="w-16 h-16 border-4 border-t-indigo-500 border-r-indigo-300 border-b-indigo-100 border-l-indigo-300 rounded-full animate-spin"></div>
        <p className="text-gray-200 mt-4 text-center font-medium">로딩 중...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 