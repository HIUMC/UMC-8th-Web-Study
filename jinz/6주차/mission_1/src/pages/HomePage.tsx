import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const fetchLPcards = async () => {
  const res = await fetch('http://localhost:8000/v1/lps');
  return res.json();
};

function LPcardsComponet() {
  const {data, error, isLoading, refetch} = useQuery({
    queryKey: ['lps'],
    queryFn: fetchLPcards,
    staleTime: 1000 * 60 * 5, 
  })

  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sortedData = [...(data?.data?.data || [])].sort((a, b) => {
    const dataA = new Date(a.createdAt).getTime();
    const dataB = new Date(b.createdAt).getTime();
    return sortOrder === 'newest' ? dataB - dataA : dataA - dataB;
  })

  const navigate = useNavigate();
  const {accessToken} = useAuth();

  
  if(isLoading) return <div>로딩 중...</div>;
  if (error){
    console.error("에러 발생:", error);
    return <div>에러입니다 ㅠㅠ</div>;
  } 

  const handleCardClick = (id:number) => {
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
        {sortedData.map(( lp:any) => (
          <div key={lp.id} 
            className="relative overflow-hidden hover:shadow-lg transform hover:scale-110 transition-transform"
            onClick={() => handleCardClick(lp.id)}>
            {/* 사진이 징그러워서 일단 이미지 넣어둠 나중에 lp.thumbnail로 변경 필요요 */}
            <img src={'/sza.jpg'} 
              alt={lp.title} 
              className="w-full object-cover " /> 
              
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-50 transition-opacity flex flex-col justify-center items-center text-center text-white p-2">
              <h3 className="text-lg font-semibold mb-1 truncate w-full ">{lp.title}</h3>
              <p className="text-sm">{new Date(lp.createdAt).toLocaleDateString()}</p>
              <p className="text-sm">❤️ {lp.likes.length} likes</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

}

const HomePage = () => {
  return (
    <div className="flex items-center justify-center h-full gap-4">
        <LPcardsComponet/>
    </div>
  );
}

export default HomePage;