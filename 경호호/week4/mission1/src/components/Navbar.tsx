import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-gray-800 py-4 sticky top-0 z-10 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center md:justify-between gap-3 sm:gap-4">
          <Link 
            to="/" 
            className="text-white font-bold text-xl hidden md:block hover:text-gray-300 transition-colors duration-200"
          >
            영화 정보
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/') 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              홈
            </Link>
            
            <Link
              to="/movies/popular"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/movies/popular') 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              인기 영화
            </Link>
            
            <Link
              to="/movies/upcoming"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/movies/upcoming') 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              개봉 예정
            </Link>
            
            <Link
              to="/movies/top-rated"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/movies/top-rated') 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              평점 높은
            </Link>
            
            <Link
              to="/movies/now_playing"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/movies/now_playing') 
                  ? 'bg-gray-900 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              상영 중
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 