import React from "react";
import { NavLink } from 'react-router-dom';
import '../App.css'

const Navbar: React.FC=()=>{
    return(
        <nav>
            <ul className="list-none p-2 m-0 flex gap-4 text-[14px] font-sans">
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>홈</NavLink></li>
                <li><NavLink to="/movies/now_playing" className={({ isActive }) => isActive ? "active" : ""}>현재 상영 중</NavLink></li>
                <li><NavLink to="/movies/popular" className={({ isActive }) => isActive ? "active" : ""}>인기 영화</NavLink></li>
                <li><NavLink to="/movies/top_rated" className={({ isActive }) => isActive ? "active" : ""}>평점 높은 영화</NavLink></li>
                <li><NavLink to="/movies/upcoming" className={({ isActive }) => isActive ? "active" : ""}>개봉 예정</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;