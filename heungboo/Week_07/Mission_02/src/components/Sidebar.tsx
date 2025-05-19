import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteAccountModal from "../pages/modalPages/DeleteAccountModal";

interface SidebarProps {
  mode?: "overlay" | "inline";
}

const Sidebar = ({ mode = "overlay" }: SidebarProps) => {
  const navigate = useNavigate();

  if (mode === "inline") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleDeleteAccount = () => {
      // 탈퇴 로직 추가 (예: API 호출)
      console.log("계정이 탈퇴되었습니다.");
      setIsDeleteModalOpen(false);
    };

    return (
      <div className="flex flex-col justify-between w-40 min-w-30 h-full bg-gray-100 dark:bg-gray-800 shadow-md p-6">
        {/* 위쪽 메뉴 */}
        <div className="space-y-4">
          <button
            className="w-full text-left px-4 py-2 font-bold text-gray-800 dark:text-gray-200 transition duration-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={() => navigate("/search")}
          >
            찾기
          </button>
          <hr className="border-gray-300 dark:border-gray-700" />
          <button
            className="w-full text-left px-4 py-2 font-bold text-gray-800 dark:text-gray-200 transition duration-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-700"
            onClick={() => navigate("/my")}
          >
            마이페이지
          </button>
        </div>

        {/* 아래쪽 메뉴 */}
        <div className="mt-6">
          <hr className="border-gray-300 dark:border-gray-700 mb-4" />
          <button
            className="w-full text-left px-4 py-2 font-bold text-red-500 transition duration-200 rounded-md hover:bg-red-600 hover:text-white"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            탈퇴하기
          </button>
        </div>

        {/* Delete Account Modal */}
        {isDeleteModalOpen && (
          <DeleteAccountModal
            onClose={() => setIsDeleteModalOpen(false)}
            onConfirm={handleDeleteAccount}
          />
        )}
      </div>
    );
  }
  return null;
};

export default Sidebar;
