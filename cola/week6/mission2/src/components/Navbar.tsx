import { useSidebar } from "../context/SidebarContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiMenu } from "react-icons/fi";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

const Navbar = () => {
  const { toggleSidebar } = useSidebar();
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const { name } = useGetMyInfo().data || {};

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center bg-gray-800 text-white gap-4 p-4">
      <div className="flex items-center gap-2">
        {/* 메뉴 버튼 */}
        <FiMenu
          className="text-2xl cursor-pointer"
          onClick={toggleSidebar}
        />
        <Link to={"/"} className="text-2xl font-bold text-pink-500">
          DOLIGO
        </Link>
      </div>
      <div className="flex gap-2">
        {!accessToken && (
          <>
            <Link to={"/login"} className="bg-black px-4 py-2 rounded-md">
              로그인
            </Link>
            <Link to={"/signup"} className="bg-pink-500 px-4 py-2 rounded-md">
              회원가입
            </Link>
          </>
        )}
        {accessToken && (
          <div className="flex gap-3 items-center">
            <Link to="/search">
              <FiSearch className="text-white text-2xl" />
            </Link>
            {name && (
              <span className="text-white text-md">{name}님 반갑습니다.</span>
            )}
            <button
              onClick={handleLogout}
              className="cursor-pointer bg-pink-500 px-4 py-2 rounded-md"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;