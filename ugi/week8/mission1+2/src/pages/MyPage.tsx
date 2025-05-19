import { useNavigate } from "react-router-dom";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useUpdateProfile } from "../hooks/mutations/useUpdateProfile";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { data } = useGetMyInfo();
  const [newName, setNewName] = useState(data?.data?.name || "");
  const [bio, setBio] = useState(data?.data?.bio || "");
  const { mutate: updateProfile } = useUpdateProfile();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleProfileUpdate = () => {
    if (!newName.trim()) {
      alert("이름은 비워둘 수 없습니다.");
      return;
    }

    updateProfile({
      name: newName,
      bio,
    });
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
            placeholder="이름"
          />
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border rounded px-3 py-2 mb-2 w-full text-center"
            placeholder="소개 (bio)"
          />
          <button
            onClick={handleProfileUpdate}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full mb-4"
          >
            정보 저장
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


