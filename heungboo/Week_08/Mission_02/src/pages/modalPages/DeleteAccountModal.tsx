import { deleteUser } from "../../apis/auth";

const DeleteAccountModal = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const handleDelete = async () => {
    try {
      await deleteUser();
      alert("회원 탈퇴가 완료되었습니다.");
      onConfirm(); // 탈퇴 후 추가 동작 (예: 로그아웃 처리)
    } catch (error) {
      console.error("회원 탈퇴 실패:", error);
      alert("회원 탈퇴 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="absolute inset-0 bg-opacity-30 backdrop-blur-sm"></div>

      <div className="bg-gray-400 rounded-lg shadow-lg w-120 p-6 relative z-10">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center text-white">
          정말 탈퇴하시겠습니까?
        </h2>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          >
            예
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-red-600"
          >
            아니오
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
