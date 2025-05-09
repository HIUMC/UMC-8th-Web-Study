import { useState } from 'react';
import { useGetLPList } from '../hooks/useGetLPList';
import { Layout } from '../components/layout/Layout';
import { LPCard } from '../components/LPCard';
import { PaginationOrder } from '../types/lp';

const HomePage = () => {
  const [order, setOrder] = useState<PaginationOrder>(PaginationOrder.DESC);
  const { data, isLoading, isError } = useGetLPList({ order });

  const toggleOrder = () => {
    setOrder(order === PaginationOrder.DESC ? PaginationOrder.ASC : PaginationOrder.DESC);
  };

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">LP 목록</h1>
          <button
            onClick={toggleOrder}
            className="bg-purple-600 px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-colors"
          >
            {order === PaginationOrder.DESC ? '최신순' : '오래된순'}
          </button>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        {isError && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-4 rounded-md">
            데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
          </div>
        )}

        {data && data.data && data.data.data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.data.data.map((lp) => (
              <LPCard key={lp.id} lp={lp} />
            ))}
          </div>
        )}

        {data && data.data && data.data.data && data.data.data.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-400">LP가 없습니다.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
