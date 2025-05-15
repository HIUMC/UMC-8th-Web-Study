import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export interface NavbarProps {
  onToggleSidebar: () => void; // Add a prop to handle sidebar toggle
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { accessToken } = useAuth();
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between p-4">
        <button
          onClick={onToggleSidebar}
          className="text-gray-900 dark:text-white focus:outline-none cursor-pointer"
        >
          {/* Burger Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <Link
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          SpinningSpinning Dolimpan
        </Link>
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
            <Link
              to={"/my"}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              마이 페이지
            </Link>
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
