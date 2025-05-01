import {Link, useLocation} from "react-router-dom";
import type { FC } from 'react';

const Navbar: FC = () => {
    const location = useLocation();

    return (
        <nav className="bg-white p-4 shadow-md">
            <div className="container mx-auto flex gap-8">
                <Link 
                    to={'/'} 
                    className={`text-lg font-semibold transition-colors duration-200 ${
                        location.pathname === '/' ? 'text-[#88bfba]' : 'text-gray-700 hover:text-[#88bfba]'
                    }`}
                >
                    홈
                </Link>
                <Link 
                    to='/movies/popular'
                    className={`text-lg font-semibold transition-colors duration-200 ${
                        location.pathname === '/movies/popular' ? 'text-[#88bfba]' : 'text-gray-700 hover:text-[#88bfba]'
                    }`}
                >
                    인기 영화
                </Link>
                <Link 
                    to='/movies/top_rated'
                    className={`text-lg font-semibold transition-colors duration-200 ${
                        location.pathname === '/movies/top_rated' ? 'text-[#88bfba]' : 'text-gray-700 hover:text-[#88bfba]'
                    }`}
                >
                    평점 높은
                </Link>
                <Link 
                    to='/movies/upcoming'
                    className={`text-lg font-semibold transition-colors duration-200 ${
                        location.pathname === '/movies/upcoming' ? 'text-[#88bfba]' : 'text-gray-700 hover:text-[#88bfba]'
                    }`}
                >
                    개봉 예정
                </Link>
                <Link 
                    to='/movies/now_playing'
                    className={`text-lg font-semibold transition-colors duration-200 ${
                        location.pathname === '/movies/now_playing' ? 'text-[#88bfba]' : 'text-gray-700 hover:text-[#88bfba]'
                    }`}
                >
                    상영 중
                </Link>
            </div>
        </nav>
    );
};

export default Navbar; 