import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", text: "ehffuehffu" },
  { to: "/login", text: "로그인" },
  { to: "/signup", text: "회원가입" },
  { to: "/my", text: "마이페이지" },
];

export function NavbarNotLoginned() {
  const firstLink = LINKS[0];
  const otherLinks = LINKS.slice(1);

  return (
    <div className="flex flex-row gap-10 pd-4 w-full justify-between p-6">
      <NavLink
        key={firstLink.to}
        to={firstLink.to}
        className={({ isActive }) =>
          isActive ? "text-[#b2dab1] font-bold" : "text-gray-600"
        }
      >
        {firstLink.text}
      </NavLink>

      {/* 나머지 링크들 */}
      <div className="flex space-x-4 gap-10">
        {otherLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? "text-[#b2dab1] font-bold" : "text-gray-600"
            }
          >
            {link.text}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
