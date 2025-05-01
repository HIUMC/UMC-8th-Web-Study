import React from "react";
import { NavLink } from 'react-router-dom';
import '../App.css'

const Navbar: React.FC=()=>{
    return(
        <nav>
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>홈</NavLink></li>
                <li><NavLink to="/NowPlaying" className={({ isActive }) => isActive ? "active" : ""}>현재 상영 중</NavLink></li>
                <li><NavLink to="/Popular" className={({ isActive }) => isActive ? "active" : ""}>인기 영화</NavLink></li>
                <li><NavLink to="/TopRated" className={({ isActive }) => isActive ? "active" : ""}>평점 높은 영화</NavLink></li>
                <li><NavLink to="/UpComing" className={({ isActive }) => isActive ? "active" : ""}>개봉 예정</NavLink></li>
            </ul>
        </nav>
    )
}

export default Navbar;