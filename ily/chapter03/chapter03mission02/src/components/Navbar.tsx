import { NavLink } from "react-router-dom";
import React from "react";

const LINKS = [
  { to: "/", text: "홈" },
  { to: "/movies/popular", text: "인기 영화" },
  { to: "/movies/now_playing", text: "상영 중" },
  { to: "/movies/top_rated", text: "평점 순" },
  { to: "/movies/upcoming", text: "개봉 예정" },
];

export function Navbar() {
  return (
    <div className="flex gap-3 pd-4 w-full justify-center gap-50">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({
            isActive,
          }): "text-[#b2dab1] font-bold" | "text-gray-600" => {
            return isActive ? "text-[#b2dab1] font-bold" : "text-gray-600";
          }}
        >
          {link.text}
        </NavLink>
      ))}
    </div>
  );
}
