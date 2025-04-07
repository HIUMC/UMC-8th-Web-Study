interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // 페이지 번호 배열 생성 (최대 5개)
  const getPageNumbers = () => {
    const pages = [];
    const maxPageDisplay = 5;
    
    // 시작 페이지와 끝 페이지 계산
    let startPage = Math.max(1, currentPage - Math.floor(maxPageDisplay / 2));
    let endPage = Math.min(totalPages, startPage + maxPageDisplay - 1);
    
    // 표시할 페이지 수가 maxPageDisplay보다 작을 경우 시작 페이지 조정
    if (endPage - startPage + 1 < maxPageDisplay) {
      startPage = Math.max(1, endPage - maxPageDisplay + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };
  
  return (
    <div className="flex flex-wrap justify-center items-center space-x-2">
      {/* 첫 페이지 버튼 */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage <= 1}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage <= 1
            ? 'bg-white/5 text-gray-500 cursor-not-allowed backdrop-blur-lg'
            : 'bg-white/10 text-gray-300 hover:bg-indigo-600/70 hover:text-white backdrop-blur-lg border border-white/5'
        }`}
      >
        «
      </button>
      
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage <= 1
            ? 'bg-white/5 text-gray-500 cursor-not-allowed backdrop-blur-lg'
            : 'bg-white/10 text-gray-300 hover:bg-indigo-600/70 hover:text-white backdrop-blur-lg border border-white/5'
        }`}
      >
        ‹
      </button>
      
      {/* 페이지 번호 버튼 */}
      {getPageNumbers().map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-md transition-colors backdrop-blur-lg ${
            currentPage === page
              ? 'bg-indigo-600/70 text-white border border-indigo-500/30'
              : 'bg-white/10 text-gray-300 hover:bg-indigo-600/70 hover:text-white border border-white/5'
          }`}
        >
          {page}
        </button>
      ))}
      
      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage >= totalPages
            ? 'bg-white/5 text-gray-500 cursor-not-allowed backdrop-blur-lg'
            : 'bg-white/10 text-gray-300 hover:bg-indigo-600/70 hover:text-white backdrop-blur-lg border border-white/5'
        }`}
      >
        ›
      </button>
      
      {/* 마지막 페이지 버튼 */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage >= totalPages}
        className={`px-3 py-2 rounded-md transition-colors ${
          currentPage >= totalPages
            ? 'bg-white/5 text-gray-500 cursor-not-allowed backdrop-blur-lg'
            : 'bg-white/10 text-gray-300 hover:bg-indigo-600/70 hover:text-white backdrop-blur-lg border border-white/5'
        }`}
      >
        »
      </button>
    </div>
  );
};

export default Pagination; 