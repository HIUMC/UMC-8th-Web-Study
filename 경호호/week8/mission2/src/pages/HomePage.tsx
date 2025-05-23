import { useState, useRef, useEffect } from 'react';
import { useInfiniteLPList } from '../hooks/useInfiniteLPList';
import { Layout } from '../components/layout/Layout';
import { LPCard } from '../components/LPCard';
import { PaginationOrder } from '../types/lp';
import SkeletonCard from '../components/LPSkeletonCard';
import LPCreateModal from '../components/LPCreateModal';
import { useDebounce } from '../hooks/useDebounce';
import { Search, X } from 'lucide-react';
import { useThrottle } from '../hooks/useThrottle';

const HomePage = () => {
  const [order, setOrder] = useState<PaginationOrder>(PaginationOrder.DESC);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    isError,
    refetch
  } = useInfiniteLPList({ 
    initialCursor: "0",
    order,
    limit: 8,
    search: debouncedSearchTerm
  });
  
  const throttledFetchNextPage = useThrottle(fetchNextPage, 3000);
  
  const toggleOrder = () => {
    setOrder(order === PaginationOrder.DESC ? PaginationOrder.ASC : PaginationOrder.DESC);
  };

  // 검색어가 변경될 때마다 데이터 다시 불러오기
  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      refetch();
    }
  }, [debouncedSearchTerm, refetch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          throttledFetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [throttledFetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  const allLPs = data?.pages.flatMap(page => page.items) || [];

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">LP 목록</h1>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-600 px-4 py-2 rounded-md text-sm hover:bg-green-700 transition-colors"
            >
              LP 작성
            </button>
            <button
              onClick={toggleOrder}
              className="bg-purple-600 px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors"
            >
              {order === PaginationOrder.DESC ? '최신순' : '오래된순'}
            </button>
          </div>
        </div>

        {/* 검색창 추가 */}
        <div className="relative mb-6">
          <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden">
            <span className="pl-3 text-gray-400">
              <Search size={18} />
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="LP 검색..."
              className="w-full py-2 px-3 bg-transparent border-none outline-none text-white"
            />
            {searchTerm && (
              <button 
                onClick={handleClearSearch}
                className="pr-3 text-gray-400 hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </div>
          {debouncedSearchTerm && debouncedSearchTerm !== searchTerm && (
            <div className="absolute right-0 mt-1 text-xs text-gray-400">
              검색 중...
            </div>
          )}
        </div>

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {isError && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-4 rounded-md">
            데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
          </div>
        )}

        {data && allLPs.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allLPs.map((lp) => (
              <LPCard key={lp.id} lp={lp} />
            ))}
          </div>
        )}

        {data && allLPs.length === 0 && (
          <div className="text-center py-10">
            {debouncedSearchTerm ? (
              <p className="text-gray-400">검색 결과가 없습니다.</p>
            ) : (
              <p className="text-gray-400">LP가 없습니다.</p>
            )}
          </div>
        )}

        {hasNextPage && (
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonCard key={`loading-${index}`} />
            ))}
          </div>
        )}

        <div ref={observerTarget} className="h-4 mt-4"></div>
        <LPCreateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    </Layout>
  );
};

export default HomePage;
