const LpCardSkeleton = () => {
    return (
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-300 animate-pulse">
        {/* 배경 영역 */}
        <div className="w-full h-full bg-gray-300" />
  
        {/* 하단 텍스트 스켈레톤 */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 opacity-100">
          <div className="h-4 bg-gray-400 rounded mb-2 w-3/4" />
          <div className="flex justify-between items-center mt-1 gap-2">
            <div className="h-4 bg-gray-400 rounded w-1/3" />
            <div className="h-4 bg-gray-400 rounded w-1/4" />
          </div>
        </div>
      </div>
    );
  };
  
  export default LpCardSkeleton;
  