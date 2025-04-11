interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className="flex flex-wrap justify-center items-center mt-6 sm:mt-8 mb-4 gap-2 sm:gap-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 sm:px-4 sm:py-2 rounded text-sm font-medium transition-colors duration-200 ${
          currentPage === 1
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        aria-label="이전 페이지"
      >
        이전
      </button>
      
      {totalPages > 7 && currentPage > 4 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="px-3 py-1 sm:px-4 sm:py-2 rounded text-sm font-medium bg-gray-200 hover:bg-gray-300"
          >
            1
          </button>
          <span className="px-1 text-gray-500">...</span>
        </>
      )}
      
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        // 현재 페이지 주변 페이지만 표시
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 2 && page <= currentPage + 2)
        ) {
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded text-sm font-medium transition-colors duration-200 ${
                currentPage === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {page}
            </button>
          );
        }
        return null;
      }).filter(Boolean)}
      
      {totalPages > 7 && currentPage < totalPages - 3 && (
        <>
          <span className="px-1 text-gray-500">...</span>
          <button
            onClick={() => onPageChange(totalPages)}
            className="px-3 py-1 sm:px-4 sm:py-2 rounded text-sm font-medium bg-gray-200 hover:bg-gray-300"
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 sm:px-4 sm:py-2 rounded text-sm font-medium transition-colors duration-200 ${
          currentPage === totalPages
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        aria-label="다음 페이지"
      >
        다음
      </button>
    </div>
  );
};

export default Pagination; 