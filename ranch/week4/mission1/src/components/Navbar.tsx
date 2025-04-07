import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "홈" },
  { to: "/movies/popular", label: "인기 영화" },
  { to: "/movies/now_playing", label: "상영 중" },
  { to: "/movies/top_rated", label: "평점 높은" },
  { to: "/movies/upcoming", label: "개봉 예정" },
];

export const Navbar = () => {
  return (
    <div className="flex justify-center gap-4 p-3 bg-[#1E3A5F] text-[#B2DAB1] shadow-md">
      {LINKS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            isActive
              ? "font-bold border-b-2 border-[#B2DAB1]"
              : "hover:text-white transition-colors"
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};
