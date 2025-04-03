import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <NavLink to="/" className="text-white text-xl font-bold mb-4 sm:mb-0">
            영화 웹사이트
          </NavLink>
          
          <div className="flex flex-wrap justify-center gap-2">
            <NavLink 
              to="/movies/popular" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`
              }
            >
              인기 영화
            </NavLink>
            
            <NavLink 
              to="/movies/upcoming" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`
              }
            >
              개봉 예정
            </NavLink>
            
            <NavLink 
              to="/movies/top_rated" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`
              }
            >
              평점 높은 영화
            </NavLink>
            
            <NavLink 
              to="/movies/now_playing" 
              className={({ isActive }) => 
                `px-4 py-2 rounded-md transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`
              }
            >
              상영 중인 영화
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 