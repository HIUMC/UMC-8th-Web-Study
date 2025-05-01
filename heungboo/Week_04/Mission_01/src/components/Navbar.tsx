import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "홈" },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now_playing", label: "현재 상영 중인 영화" },
  {
    to: "/movies/top_rated",
    label: "평점 높은 영화",
  },
  {
    to: "/movies/upcoming",
    label: "개봉 예정",
  },
];

const NavBar = () => {
  return (
    <div className="flex gap-3 p-4">
      {LINKS.map(
        ({ to, label }): React.ReactElement => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => {
              return isActive ? "text-[#b2dab1] font-bold " : "text-gray-500";
            }}
          >
            {label}
          </NavLink>
        )
      )}

      {/* <Link to="/">홈</Link>
      <Link to="/movies/popular">인기 영화</Link>
      <Link to="/movies/now_playing">현재 상영 중인 영화</Link> */}
    </div>
  );
};
export default NavBar;
