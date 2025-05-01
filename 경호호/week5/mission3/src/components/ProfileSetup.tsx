import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkip = () => {
    localStorage.removeItem('signupStep');
    navigate('/signin');
  };

  const handleComplete = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      localStorage.removeItem('signupStep');
      navigate('/signin');
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-xl font-semibold mb-6 text-white">프로필 사진 설정</h2>
      
      <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center mb-4 overflow-hidden border-2 border-gray-500">
        {profileImage ? (
          <img src={profileImage} alt="프로필 미리보기" className="w-full h-full object-cover" />
        ) : (
          <div className="text-gray-400 text-2xl">사진</div>
        )}
      </div>
      
      <input
        type="file"
        id="profileUpload"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      
      <label
        htmlFor="profileUpload"
        className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md mb-4 transition duration-150 ease-in-out"
      >
        사진 선택
      </label>
      
      <div className="flex w-full justify-between mt-6">
        <button
          type="button"
          onClick={handleSkip}
          className="text-gray-400 hover:text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
          disabled={isUploading}
        >
          건너뛰기
        </button>
        
        <button
          type="button"
          onClick={handleComplete}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          disabled={!profileImage || isUploading}
        >
          {isUploading ? '저장 중...' : '완료'}
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;
