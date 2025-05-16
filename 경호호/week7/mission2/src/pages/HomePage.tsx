import { useState, useRef, useEffect } from 'react';
import { useInfiniteLPList } from '../hooks/useInfiniteLPList';
import { Layout } from '../components/layout/Layout';
import { LPCard } from '../components/LPCard';
import { PaginationOrder } from '../types/lp';
import SkeletonCard from '../components/LPSkeletonCard';
import LPCreateModal from '../components/LPCreateModal';

const HomePage = () => {
  const [order, setOrder] = useState<PaginationOrder>(PaginationOrder.DESC);
  const observerTarget = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { 
    data, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading, 
    isError 
  } = useInfiniteLPList({ 
    initialCursor: "0",
    order,
    limit: 8,
    search: ""
  });
  
  const toggleOrder = () => {
    setOrder(order === PaginationOrder.DESC ? PaginationOrder.ASC : PaginationOrder.DESC);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
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
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

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
            <p className="text-gray-400">LP가 없습니다.</p>
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
