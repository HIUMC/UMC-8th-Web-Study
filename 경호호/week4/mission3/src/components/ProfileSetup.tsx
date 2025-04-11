import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserCircle } from 'lucide-react'; // 예시 아이콘

const ProfileSetup = () => {
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
      // 실제 업로드 로직은 생략
    }
  };

  const handleSkip = () => {
    alert('프로필 설정을 건너뛰고 로그인 페이지로 이동합니다.');
    localStorage.removeItem('signupStep'); // 단계 정보 제거
    navigate('/signin');
  };

  const handleComplete = () => {
    // 실제 프로필 저장 로직은 생략
    setIsUploading(true);
    setTimeout(() => { // 업로드 시뮬레이션
      setIsUploading(false);
      alert('프로필 사진이 설정되었습니다. 로그인 페이지로 이동합니다.');
      localStorage.removeItem('signupStep'); // 단계 정보 제거
      navigate('/signin');
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-6 text-white">프로필 사진 설정</h2>
      <div className="w-32 h-32 rounded-full bg-gray-600 flex items-center justify-center mb-4 overflow-hidden border-2 border-gray-500">
        {profileImage ? (
          <img src={profileImage} alt="프로필 미리보기" className="w-full h-full object-cover" />
        ) : (
          <UserCircle size={64} className="text-gray-400" />
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
          onClick={handleSkip}
          className="text-gray-400 hover:text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
          disabled={isUploading}
        >
          건너뛰기
        </button>
        <button
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
