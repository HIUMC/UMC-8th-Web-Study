import { JSX } from 'react';
import { NavLink } from 'react-router-dom';

const LINKS = [
  { to: '/', label: '홈' },
  { to: '/movies/category/popular', label: '인기 영화' },
  { to: '/movies/category/now_playing', label: '상영 중' },
  { to: '/movies/category/top_rated', label: '평점 높은' },
  { to: '/movies/category/upcoming', label: '개봉 예정' },
];

export const Navbar = (): JSX.Element => {
  return (
    <div className="flex gap-3 p-4">
      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => (
            isActive ? 'text-[#b2dab1] font-bold' : 'text-gray-500'
          )}
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};

