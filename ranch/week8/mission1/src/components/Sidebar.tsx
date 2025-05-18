import { Link } from "react-router-dom";

interface SidebarProps {
  className?: string; // Add className as an optional prop
}

const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside className={`h-full p-6 bg-gray-100 dark:bg-gray-800 ${className} shadow-lg`}>
      <nav className="pt-6 space-y-6">
        <Link
          to="/search"
          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <span className="text-lg font-medium">검색</span>
        </Link>
        <Link
          to="/my"
          className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 mr-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <span className="text-lg font-medium">마이페이지</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;