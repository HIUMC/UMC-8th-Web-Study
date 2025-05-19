import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyInfo } from "../apis/auth";
import EditProfileModal from "./modalPages/EditProfileModal";
import { ResponseMyInfoDto } from "../types/auth";

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const response: ResponseMyInfoDto = await getMyInfo();
      setData(response);
    };

    getData();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-8">마이페이지</h1>

      {/* Profile Section */}
      <div className="bg-whiterounded-lg p-6 flex flex-col items-center">
        {/* Profile Image */}
        <img
          src={data?.data.avatar || "/default-profile.jpg"}
          alt="Profile"
          className="w-24 h-24 object-cover rounded-full border-2 border-blue-500 mb-4"
        />

        {/* Name */}
        <h2 className="text-xl font-semibold mb-2">
          이름: {data?.data.name || "이름 없음"}
        </h2>

        {/* Bio */}
        <p className="text-gray-600 text-center">
          자기 소개: {data?.data.bio || "자기소개가 없습니다."}
        </p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="px-6 py-2  text-black rounded-md shadow-md hover:bg-gray-300 text-bold transition"
        >
          프로필 수정
        </button>
        <button
          onClick={handleLogout}
          className="px-6 py-2  text-black rounded-md shadow-md hover:bg-gray-300 text-bold transition"
        >
          로그아웃
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <EditProfileModal onClose={() => setIsEditModalOpen(false)} />
      )}
    </div>
  );
};

export default MyPage;
