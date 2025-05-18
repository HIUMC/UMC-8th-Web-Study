import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export interface NavbarProps {
  onToggleSidebar: () => void; // Add a prop to handle sidebar toggle
}

const Navbar = ({ onToggleSidebar }: NavbarProps) => {
  const { accessToken } = useAuth();
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="text-gray-900 dark:text-white focus:outline-none cursor-pointer"
        >
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

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-500 transition-colors"
        >
          SpinningSpinning Dolimpan
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          {!accessToken && (
            <>
              <Link
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
              >
                로그인
              </Link>
              <Link
                to="/signup"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
              >
                회원가입
              </Link>
            </>
          )}
          {accessToken && (
            <div className="flex items-center space-x-4">
              <Link
                to="/my"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
              >
                마이페이지
              </Link>
              <Link
                to="/search"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

