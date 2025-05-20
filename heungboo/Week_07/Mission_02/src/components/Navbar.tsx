import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

const Navbar = () => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const { data } = useGetMyInfo(accessToken);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  console.log(data);
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md-fixed w-full z-10">
      <div className="flex items-center justify-between p-4 border-b-2 border-blue-800">
        <div className="flex items-center space-x-2 gap-3">
          <Link
            to="/"
            className="text-xl text-bold text-gray-900 dark:text-white ml-10"
          >
            돌 려 돌 려 Dolimpan
          </Link>
        </div>

        <div className="space-x-6">
          {!accessToken && (
            <>
              <Link
                to={"/login"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그인
              </Link>
              <Link
                to={"/signup"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                회원가입
              </Link>
            </>
          )}
          {accessToken && (
            <div className="flex items-center space-x-6">
              <Link
                to={"/my"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                ™️ {data?.data.name}님 반갑습니다.
              </Link>
              <div>|</div>
              <button
                onClick={handleLogout}
                type="button"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
