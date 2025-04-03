import { Link } from 'react-router-dom';

const HomePage = () => {
  const categories = [
    { title: '인기영화', path: '/popular', color: 'bg-red-500' },
    { title: '상영 중', path: '/now_playing', color: 'bg-blue-500' },
    { title: '평점 높은', path: '/top_rated', color: 'bg-green-500' },
    { title: '개봉 예정', path: '/upcoming', color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">🎬 영화 랭킹 둘러보기</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {categories.map((category) => (
          <Link
            key={category.path}
            to={category.path}
            className={`${category.color} text-white rounded-xl p-6 shadow-lg hover:scale-105 transform transition-transform duration-200`}
          >
            <h2 className="text-2xl font-semibold text-center">{category.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
