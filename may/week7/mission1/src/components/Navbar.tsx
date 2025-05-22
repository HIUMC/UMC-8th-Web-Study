import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useLogout from "../hooks/mutations/useLogout";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

const Navbar = () => {
  const { accessToken } = useAuth();
  const { mutate: logout } = useLogout();
  const location = useLocation();

  // 유저 정보 가져오기 (로그인 상태일 때만)
  const { data: myInfo } = useGetMyInfo(accessToken);

  // 현재 경로가 /my인지 확인
  const isMyPage = location.pathname === "/my";

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          SpinningSpinning Dolimpan
        </Link>
        <div className="space-x-6 flex items-center">
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
            <>
              <Link
                to={"/my"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                마이 페이지
              </Link>
              <button
                onClick={() => logout()}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그아웃
              </button>
              {/* 마이페이지일 때만 환영 메시지 노출 (타입 에러 해결) */}
              {isMyPage && myInfo?.data?.data?.name && (
                <span className="ml-2 text-blue-600 font-semibold">
                  {myInfo.data.data.name}님 안녕하세요
                </span>
              )}
            </>
          )}
          <Link
            to={"/search"}
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