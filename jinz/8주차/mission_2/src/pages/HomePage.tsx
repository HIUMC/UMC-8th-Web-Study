import { useInfiniteQuery} from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getLPs } from "../apis/auth";
import { useSearch } from "../context/SearchContext";
import useThrottle from "../hooks/useThrottle";



function LPcardsComponet() {
  const {accessToken} = useAuth();
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const { searchQuery } = useSearch();
  const {ref, inView} = useInView({
    threshold: 0.5,
    rootMargin: '0px'
  });
  const throttleInView = useThrottle(inView, 3000);

  const {data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteQuery({
    queryKey: ['lps', sortOrder, searchQuery],
    queryFn: ({pageParam})=> getLPs({
      pageParam,
      order: sortOrder === 'newest' ? 'desc' : 'asc',
      search: searchQuery || null
    }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => {
      if (!lastPage?.data?.hasNext) return undefined;
      return lastPage.data.nextCursor;
    }
  });



  useEffect(() => {
    if (throttleInView && hasNextPage && !isFetchingNextPage) {
      console.log("📦 fetchNextPage 호출");
      fetchNextPage();
    }
  }, [throttleInView, hasNextPage, isFetchingNextPage, fetchNextPage]);


  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;

  const sortedData = data?.pages 
    .flatMap(page => page.data?.data || []) || [];

  const handleCardClick = (id: number) => {
    if (!accessToken) {
      alert("로그인 후 이용해주세요.");
      navigate('/login');
    } else {
      navigate(`/v1/lps/${id}`);
    }
  }

  
  return (
    <div className="w-full">
      <div className="flex gap-2 mb-4 justify-end">
        <button 
          onClick={() => setSortOrder('newest')} 
          className={`px-2 py-1 rounded text-sm ${sortOrder === 'newest' ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}>
          최신순
        </button>
        <button 
          onClick={() => setSortOrder('oldest')} 
          className={`px-2 py-1 rounded text-sm ${sortOrder === 'oldest' ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}>
          오래된순
        </button>
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {sortedData.map((lp: any) => (
          <div key={lp.id} 
            className="relative overflow-hidden hover:shadow-lg transform hover:scale-110 transition-transform"
            onClick={() => handleCardClick(lp.id)}>
            <img src={'/sza.jpg'} 
              alt={lp.title} 
              className="w-full object-cover" /> 
              
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-50 transition-opacity flex flex-col justify-center items-center text-center text-white p-2">
              <h3 className="text-lg font-semibold mb-1 truncate w-full">{lp.title}</h3>
              <p className="text-sm">{new Date(lp.createdAt).toLocaleDateString()}</p>
              <p className="text-sm">❤️ {lp.likes?.length || 0} likes</p>
            </div>
          </div>
        ))}
      </div>
      
      <div ref={ref} className="h-10 w-full flex items-center justify-center">
        {isFetchingNextPage && (
          <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="w-full h-48 bg-gray-300 animate-pulse rounded"></div>
            ))}
    </div>
  )}
</div>
    </div>
  );
}

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-full gap-4">
        <LPcardsComponet/>
    </div>
  );
}

export default HomePage;