import { useNavigate } from "react-router-dom";
import { useUpdateNickname } from "../hooks/mutations/useUpdateNickname";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data } = useGetMyInfo();
  const [newName, setNewName] = useState(data?.data?.name || "");

  const { mutate: updateNickname } = useUpdateNickname();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleNameChange = () => {
    updateNickname(newName);
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-100">
      {data && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm text-center">
          <img
            src={data.data?.avatar as string}
            alt="프로필"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border rounded px-3 py-2 mb-2 w-full text-center"
          />
          <button
            onClick={handleNameChange}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full mb-4"
          >
            닉네임 저장
          </button>
          <p className="text-gray-700 mb-2">{data.data?.email}</p>
          <button
            className="bg-red-400 hover:bg-red-500 text-white px-4 py-2 rounded w-full"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
};

export default MyPage;

