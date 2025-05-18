import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { QUERY_KEY } from "../constants/key";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  
  const { data: myInfo } = useGetMyInfo(); 


  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md-fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          SpinningSpinning Dolimpan
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            to={"/search"}
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            검색
          </Link>

          {!accessToken ? (
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
          ) : (
            <>
              <span className="text-gray-700 dark:text-gray-300">
                {myInfo?.data?.name}님
              </span>
              <Link
                to={"/my"}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                마이페이지
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
