import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="w-full min-h-[calc(100vh-64px)] bg-gray-900 text-gray-100">
      {/* 배경 그라데이션 */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-indigo-900/30 via-gray-900 to-purple-900/30" />
      <div className="fixed inset-0 -z-10 bg-[url('/src/assets/noise.png')] opacity-5"></div>
      
      <div className="w-full py-12">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white"><span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">TMDB 영화 웹사이트</span></h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">다양한 영화 카테고리를 탐색해보세요</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-full mx-auto px-8">
          <CategoryCard 
            title="인기 영화" 
            description="지금 전 세계적으로 인기 있는 영화를 확인하세요." 
            linkTo="/movies/popular" 
            bgColor="bg-gradient-to-r from-indigo-900/70 to-indigo-700/70 backdrop-blur-lg"
            hoverColor="hover:from-indigo-900/80 hover:to-indigo-700/80"
            borderColor="border-indigo-500/20"
            icon="🔥"
          />
          
          <CategoryCard 
            title="개봉 예정 영화" 
            description="곧 개봉할 기대작들을 미리 만나보세요." 
            linkTo="/movies/upcoming" 
            bgColor="bg-gradient-to-r from-teal-900/70 to-teal-700/70 backdrop-blur-lg"
            hoverColor="hover:from-teal-900/80 hover:to-teal-700/80"
            borderColor="border-teal-500/20"
            icon="🎬"
          />
          
          <CategoryCard 
            title="평점 높은 영화" 
            description="역대 최고 평점을 받은 영화들을 찾아보세요." 
            linkTo="/movies/top_rated" 
            bgColor="bg-gradient-to-r from-amber-900/70 to-amber-700/70 backdrop-blur-lg"
            hoverColor="hover:from-amber-900/80 hover:to-amber-700/80"
            borderColor="border-amber-500/20"
            icon="⭐"
          />
          
          <CategoryCard 
            title="상영 중인 영화" 
            description="현재 극장에서 상영 중인 영화를 확인하세요." 
            linkTo="/movies/now_playing" 
            bgColor="bg-gradient-to-r from-rose-900/70 to-rose-700/70 backdrop-blur-lg"
            hoverColor="hover:from-rose-900/80 hover:to-rose-700/80"
            borderColor="border-rose-500/20"
            icon="🎞️"
          />
        </div>
      </div>
    </div>
  );
};

interface CategoryCardProps {
  title: string;
  description: string;
  linkTo: string;
  bgColor: string;
  hoverColor: string;
  borderColor: string;
  icon: string;
}

const CategoryCard = ({ title, description, linkTo, bgColor, hoverColor, borderColor, icon }: CategoryCardProps) => {
  return (
    <Link 
      to={linkTo} 
      className={`${bgColor} ${hoverColor} rounded-xl p-6 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full flex flex-col border ${borderColor}`}
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <p className="mb-6 flex-grow opacity-90">{description}</p>
      <div className="mt-auto">
        <span className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium">
          살펴보기 <span className="ml-1">→</span>
        </span>
      </div>
    </Link>
  );
};

export default HomePage; 