import { useState } from "react";
import { usePatchUserInfo } from "../../hooks/mutations/usePatchUserInfo";

const EditProfileModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const { mutate: patchUserInfo } = usePatchUserInfo();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result) {
          setProfileImage(reader.result as string); // 이미지 미리보기 설정
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("이름을 입력해주세요 !");
      return;
    }

    const updateData = {
      name,
      bio: bio || null,
      avatar: profileImage || null,
    };

    patchUserInfo(updateData);
    onSave(updateData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4">프로필 수정</h2>

        <div className="mb-4">
          <label htmlFor="profileImageInput">
            <img
              src={profileImage || "/default-profile.jpg"}
              alt="Profile"
              className="w-24 h-24 object-cover rounded-full mx-auto cursor-pointer"
            />
          </label>
          <input
            id="profileImageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">이름</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력하세요"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Bio</label>
          <textarea
            className="w-full h-20 border border-gray-300 rounded-md p-2"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="자기소개를 입력하세요"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
