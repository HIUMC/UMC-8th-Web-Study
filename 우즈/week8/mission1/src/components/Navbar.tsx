import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getMyInfo } from "../apis/auth";

type NavbarProps = {
  onHoverChange: (hovered: boolean) => void;
};

const Navbar = ({ onHoverChange }: NavbarProps) => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  // 유저 정보 불러오기
  const { data: userInfo, isSuccess } = useQuery({
    queryKey: ["myInfo"],
    queryFn: getMyInfo,
    enabled: !!accessToken, // 로그인한 경우만 실행
    staleTime: 1000 * 60, // 1분 정도 캐싱 (선택)
  });

  const handleLogout = async () => {
    await logout(); // AuthContext 내부 처리
    navigate("/login");
  };

  return (
    <nav className="relative bg-white dark:bg-gray-900 shadow-md w-full z-10">
      <div className="flex items-center justify-between p-4">
        {/* ☰ 아이콘 */}
        <div
          onMouseEnter={() => onHoverChange(true)}
          onMouseLeave={() => onHoverChange(false)}
          className="text-2xl mr-4 cursor-pointer"
        >
          ☰
        </div>

        {/* 제목 */}
        <Link
          to="/"
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl font-bold text-gray-900 dark:text-white"
        >
          SpinningSpinning Dolimpan 🌀
        </Link>

        {/* 오른쪽 메뉴 */}
        <div className="space-x-6 flex items-center">
          {!accessToken ? (
            <>
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                회원가입
              </Link>
            </>
          ) : (
            <>
              {isSuccess && (
                <span className="text-gray-700 dark:text-gray-300">
                  {userInfo?.data.name}님 반갑습니다.
                </span>
              )}
              <button
                onClick={handleLogout}
                className="text-gray-700 dark:text-gray-300 hover:text-red-500"
              >
                로그아웃
              </button>
              <Link
                to="/my"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                마이 페이지
              </Link>
            </>
          )}

          <Link
            to="/search"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            검색
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
