import { NavLink } from "react-router-dom";
import { getMyInfo } from "../apis/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ResponseMyInfoDto } from "../utils/types/auth";

const LINKS = [
  { to: "/", text: "홈" },
  { to: "/logout", text: "로그아웃" },
  { to: "/my", text: "마이페이지" },
];

export function NavbarIsLoginned() {
  const firstLink = LINKS[0];
  const otherLinks = LINKS.slice(1);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);

  useEffect(() => {
    const getData = async () => {
      const response = await getMyInfo();

      setData(response);
      console.log("response 출력:", response);
    };
    console.log("in loginned data출력:", data);

    getData();
  }, []);

  const logoutHandler = async () => {
    await logout();
    navigate("/");
  };
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
        <div>{data?.data.name}님 방가 방가 ㅋㅋ</div>
        {otherLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? "text-[#b2dab1] font-bold" : "text-gray-600"
            }
            onClick={link.to === "/logout" ? logoutHandler : undefined}
          >
            {link.text}
          </NavLink>
        ))}
      </div>
    </div>
  );
}
