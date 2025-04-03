import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">TMDB 영화 웹사이트에 오신 것을 환영합니다</h1>
        <p className="text-xl mb-8">다양한 영화 카테고리를 탐색해보세요</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          <CategoryCard 
            title="인기 영화" 
            description="지금 전 세계적으로 인기 있는 영화를 확인하세요." 
            linkTo="/movies/popular" 
            bgColor="bg-blue-600"
          />
          
          <CategoryCard 
            title="개봉 예정 영화" 
            description="곧 개봉할 기대작들을 미리 만나보세요." 
            linkTo="/movies/upcoming" 
            bgColor="bg-green-600"
          />
          
          <CategoryCard 
            title="평점 높은 영화" 
            description="역대 최고 평점을 받은 영화들을 찾아보세요." 
            linkTo="/movies/top_rated" 
            bgColor="bg-yellow-600"
          />
          
          <CategoryCard 
            title="상영 중인 영화" 
            description="현재 극장에서 상영 중인 영화를 확인하세요." 
            linkTo="/movies/now_playing" 
            bgColor="bg-red-600"
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
}

const CategoryCard = ({ title, description, linkTo, bgColor }: CategoryCardProps) => {
  return (
    <Link 
      to={linkTo} 
      className={`${bgColor} rounded-lg p-6 text-white shadow-lg transition-transform hover:scale-105`}
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      <span className="inline-block mt-2 font-medium">
        살펴보기 &rarr;
      </span>
    </Link>
  );
};

export default HomePage; 