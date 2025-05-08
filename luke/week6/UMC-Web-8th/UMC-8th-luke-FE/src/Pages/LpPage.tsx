import React, { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLpInfiniteList } from '../hooks/useLpInfiniteList';

export default function LpPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const order = searchParams.get('order') === 'desc' ? 'desc' : 'asc';

  const {
    data,isLoading,isError,fetchNextPage,hasNextPage,isFetchingNextPage,
  } = useLpInfiniteList(order);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

   const toggleOrder = () => {
    const next = order === 'asc' ? 'desc' : 'asc';
    setSearchParams({ order: next });
  };
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div key={idx} className="animate-pulse bg-gray-800 p-4 rounded-lg">
            <div className="w-full h-40 bg-gray-700 rounded" />
            <div className="h-4 bg-gray-700 rounded mt-4 w-3/4" />
            <div className="h-3 bg-gray-700 rounded mt-2 w-1/2" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex bg-gray-950 min-h-screen">
      {/* 사이드바 (Static) */}
      <aside className="hidden md:block w-64 bg-gray-900 border-r border-gray-800 p-6">
        <h2 className="text-xl font-semibold text-white mb-4">LP 메뉴</h2>
        <ul className="space-y-4 text-gray-300">
          <li><Link to="/lp" className="block px-2 py-1 rounded hover:bg-gray-800 hover:text-blue-400 transition-colors">전체 LP 목록</Link></li>

          <li><Link to="/lp"className="block px-2 py-1 rounded hover:bg-gray-800 hover:text-blue-400 transition-colors">즐겨찾기</Link></li>

          <li><Link to="/lp"className="block px-2 py-1 rounded hover:bg-gray-800 hover:text-blue-400 transition-colors">찾기</Link></li>
        </ul>
      </aside>

      {/* 본문 콘텐츠 */}
      <section className="flex-1 p-6">
        {/* 정렬 버튼 */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">LP 목록</h1>
          <button onClick={toggleOrder} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"> {order === 'asc' ? '최신순' : '오래된순'}</button>
        </div>

        {/* 에러 처리 */}
        
        {isError && <p className="text-red-400">데이터를 불러오는 중 오류가 발생했습니다.</p>}

        {/* 데이터 렌더링 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {data?.pages.flatMap(page =>
            page.data.map(lp => (
              <Link
                key={lp.id}
                to={`/lp/${lp.id}`}
                onClick={() =>
                  sessionStorage.setItem('lp-scroll', String(window.scrollY))
                }
                className="block bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={lp.thumbnail}
                  alt={lp.title}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="text-lg font-semibold text-white mt-2">
                  {lp.title}
                </h3>
              </Link>
            ))
          )}
        </div>

        {/* 다음 페이지 로딩 스켈레톤 */}
        <div ref={loadMoreRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 mt-6">
        {isFetchingNextPage &&
          Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="animate-pulse bg-gray-800 p-4 rounded-lg">
              <div className="w-full h-40 bg-gray-700 rounded" />
              <div className="h-4 bg-gray-700 rounded mt-4 w-3/4" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}