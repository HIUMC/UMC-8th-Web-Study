import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile, uploadProfileImage } from '../api/user';
import { Camera } from 'lucide-react';
import { QUERY_KEYS } from '../constants/queryKeys';

const UserEditPage = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [nicknameError, setNicknameError] = useState('');

  const { data: user, isLoading: isLoadingUser } = useQuery(
    QUERY_KEYS.USER.profile(),
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
    onError: (error: any) => {
      console.error('이미지 업로드 오류:', error);
      setError('이미지 업로드 중 오류가 발생했습니다.');
    }
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onMutate: async (newUserData) => {
      // 이전 쿼리를 취소하여 낙관적 업데이트와 충돌하지 않도록 함
      await queryClient.cancelQueries(QUERY_KEYS.USER.profile());
      
      // 이전 상태를 저장
      const previousUserData = queryClient.getQueryData(QUERY_KEYS.USER.profile());
      
      // 캐시 데이터 낙관적 업데이트
      queryClient.setQueryData(QUERY_KEYS.USER.profile(), (oldData: any) => {
        return {
          ...oldData,
          ...newUserData,
          // 이미지가 변경되었으면 그 값도 업데이트
          profileImage: profileImage || oldData.profileImage
        };
      });
      
      // 롤백을 위해 이전 데이터 반환
      return { previousUserData };
    },
    onError: (error: any, _, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousUserData) {
        queryClient.setQueryData(QUERY_KEYS.USER.profile(), context.previousUserData);
      }
      console.error('프로필 업데이트 오류:', error);
      setError(error.response?.data?.message || '프로필 업데이트 중 오류가 발생했습니다.');
    },
    onSuccess: () => {
      // 서버에서 최신 데이터 가져오기
      queryClient.invalidateQueries(QUERY_KEYS.USER.profile());
      // AuthContext의 user 정보도 업데이트하기 위해 user 쿼리도 무효화
      queryClient.invalidateQueries(QUERY_KEYS.USER.auth());
      navigate('/users/me');
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

  const validateForm = () => {
    // 닉네임 유효성 검사
    if (!nickname.trim()) {
      setNicknameError('닉네임은 필수 입력 사항입니다.');
      return false;
    }
    
    setNicknameError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 폼 유효성 검사
    if (!validateForm()) {
      return;
    }
    
    try {
      setError('');
      
      // 이미지가 변경되었으면 먼저 업로드
      if (imageFile) {
        await imageMutation.mutateAsync(imageFile);
      }
      
      // 프로필 정보 업데이트
      await updateProfileMutation.mutateAsync({
        name,
        nickname,
        bio
      });
      
      // 성공 메시지 표시 또는 리다이렉트
      // 이미 mutation의 onSuccess에서 리다이렉트 처리함
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
                    <label htmlFor="nickname" className="block text-sm font-medium text-gray-300 mb-1">
                      닉네임 <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="nickname"
                      type="text"
                      value={nickname}
                      onChange={(e) => {
                        setNickname(e.target.value);
                        if (e.target.value.trim()) {
                          setNicknameError('');
                        }
                      }}
                      className={`w-full px-3 py-2 bg-gray-700 border ${
                        nicknameError ? 'border-red-500' : 'border-gray-600'
                      } rounded-md text-white focus:outline-none focus:ring-2 ${
                        nicknameError ? 'focus:ring-red-500' : 'focus:ring-purple-500'
                      }`}
                      placeholder="닉네임을 입력하세요"
                      required
                    />
                    {nicknameError && (
                      <p className="mt-1 text-sm text-red-500">{nicknameError}</p>
                    )}
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-300 mb-1">소개</label>
                    <textarea
                      id="bio"
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="자기소개를 입력하세요 (선택사항)"
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