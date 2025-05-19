import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const Navbar = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();
  const { data: myInfo } = useGetMyInfo();
  const [search, setSearch] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(search)}`;
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md w-full z-10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* 왼쪽 로고 */}
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          SpinningSpinning Dolimpan
        </Link>

        {/* 오른쪽 영역 */}
        <div className="flex items-center space-x-6">
          {/* 닉네임 */}
          {accessToken && (
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {myInfo?.data?.name}님
            </span>
          )}

          
          

          {/* 로그인/마이페이지 */}
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
            <Link
              to="/my"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              마이페이지
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

