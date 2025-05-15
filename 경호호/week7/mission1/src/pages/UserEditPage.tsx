import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile, uploadProfileImage } from '../api/user';
import { Camera } from 'lucide-react';

const UserEditPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const { data: user, isLoading: isLoadingUser } = useQuery(
    ['userProfile'],
    getUserProfile,
    {
      staleTime: 1000 * 60 * 5, // 5분간 캐싱
      retry: 1,
    }
  );

  // 초기 데이터 설정
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setNickname(user.nickname || '');
      setBio(user.bio || '');
      setProfileImage(user.profileImage || null);
    }
  }, [user]);

  const imageMutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data) => {
      setProfileImage(data.url);
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile']);
      navigate('/users/me');
    },
    onError: (error: any) => {
      setError(error.response?.data?.message || '프로필 업데이트 중 오류가 발생했습니다.');
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
      
      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // 이미지가 변경되었으면 먼저 업로드
      if (imageFile) {
        await imageMutation.mutateAsync(imageFile);
      }
      
      // 프로필 정보 업데이트
      updateProfileMutation.mutate({
        name,
        nickname,
        bio
      });
    } catch (error: any) {
      console.error('프로필 업데이트 오류:', error);
      setError('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-2xl py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">프로필 수정</h1>
              <button 
                onClick={() => navigate('/users/me')}
                className="text-gray-400 hover:text-white"
              >
                취소
              </button>
            </div>
            
            {isLoadingUser ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-4 rounded-md mb-6">
                    {error}
                  </div>
                )}
                
                <div className="flex justify-center mb-6">
                  <div className="relative group">
                    <div className="h-32 w-32 bg-purple-600 rounded-full flex items-center justify-center text-4xl font-bold uppercase text-white overflow-hidden">
                      {profileImage ? (
                        <img src={profileImage} alt="프로필 이미지" className="h-32 w-32 object-cover" />
                      ) : (
                        name.charAt(0) || nickname.charAt(0) || '?'
                      )}
                      <label 
                        htmlFor="profileImage"
                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity"
                      >
                        <Camera size={24} />
                        <span className="sr-only">프로필 이미지 변경</span>
                      </label>
                      <input
                        type="file"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">이름</label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="이름을 입력하세요"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="nickname" className="block text-sm font-medium text-gray-300 mb-1">닉네임</label>
                    <input
                      id="nickname"
                      type="text"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="닉네임을 입력하세요"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">소개</label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="자기소개를 입력하세요"
                    />
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={updateProfileMutation.isLoading || imageMutation.isLoading}
                    className={`w-full py-3 font-medium rounded-md transition-colors ${
                      updateProfileMutation.isLoading || imageMutation.isLoading
                        ? 'bg-gray-600 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                    }`}
                  >
                    {updateProfileMutation.isLoading || imageMutation.isLoading ? '저장 중...' : '저장하기'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserEditPage; 