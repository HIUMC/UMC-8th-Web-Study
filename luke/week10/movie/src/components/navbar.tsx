import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 px-8 py-4 flex gap-8 text-base font-medium shadow-md">
      {[
        { to: '/', label: '홈' },
        { to: '/popular', label: '인기영화' },
        { to: '/now_playing', label: '상영 중' },
        { to: '/top_rated', label: '평점 높은' },
        { to: '/upcoming', label: '개봉 예정' },
        { to: '/search', label: '검색' },
      ].map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `transition-colors duration-200 ${
              isActive ? 'text-blue-400 font-bold' : 'text-white hover:text-blue-400'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;
