import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div>
      <button
        className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md md:hidden hover:bg-gray-700 transition-colors"
        onClick={() => setIsSidebarOpen(true)}
      >
        ☰
      </button>

      {/* 블러 처리된 배경 */}
      {/* <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity ${
          isSidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleCloseSidebar}
      ></div> */}

      <div className="flex-shrink-0 h-full flex flex-col justify-between bg-gray-100 dark:bg-gray-800 shadow-md">
        <div className="space-y-4 p-4">
          <button
            className="w-full text-left px-4 py-2 font-bold text-gray-800 dark:text-gray-200 transition duration-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={() => navigate("/search")}
          >
            찾기
          </button>
          <button
            className="w-full text-left px-4 py-2 font-bold text-gray-800 dark:text-gray-200 transition duration-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={() => navigate("/my")}
          >
            마이페이지
          </button>
        </div>

        <div className="p-4">
          <button
            className="w-full text-left px-4 py-2 font-bold text-red-500 transition duration-200 rounded-md hover:bg-red-600 hover:text-white"
            onClick={() => console.log("탈퇴하기")}
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
