import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile, uploadProfileImage } from '../api/user';
import { Layout } from '../components/layout/Layout';
import { Edit, Camera, Save, X } from 'lucide-react';
import { QUERY_KEYS } from '../constants/queryKeys';

const UsersMePage = () => {
  const { logout, user: authUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  // 수정 모드 상태 추가
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  
  const { data: user, isLoading, error: fetchError } = useQuery({
    queryKey: QUERY_KEYS.USER.profile(),
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 5, // 5분간 캐싱
    retry: 1,
  });

  // 수정 모드 진입 시 현재 데이터로 폼 초기화
  const handleEditMode = () => {
    if (user) {
      setName(user.name || '');
      setBio(user.bio || '');
      setProfileImage(user.profileImage || null);
    }
    setIsEditMode(true);
  };

  // 수정 모드 취소
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setError('');
  };
  
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
    // Optimistic Update 적용
    onMutate: async (newProfile) => {
      // 이전 쿼리 데이터를 캐시에서 취소하고 저장해둠
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.USER.profile() });
      const previousProfile = queryClient.getQueryData(QUERY_KEYS.USER.profile());
      
      // 유저 프로필과 인증 컨텍스트 optimistic update
      if (newProfile.name) {
        // 프로필 데이터 optimistic update
        queryClient.setQueryData(QUERY_KEYS.USER.profile(), (old: any) => ({
          ...old,
          name: newProfile.name,
          bio: newProfile.bio,
          profileImage: newProfile.avatar || old?.profileImage
        }));
        
        // AuthContext 통해 업데이트 - 헤더와 다른 컴포넌트에 즉시 반영
        updateUser({ 
          name: newProfile.name, 
          nickname: newProfile.name,
          profileImage: newProfile.avatar || profileImage
        });
      }
      
      return { previousProfile };
    },
    onError: (error: any, _variables, context) => {
      // 에러 발생시 이전 데이터로 롤백
      queryClient.setQueryData(QUERY_KEYS.USER.profile(), context?.previousProfile);
      console.error('프로필 업데이트 오류:', error);
      setError(error.response?.data?.message || '프로필 업데이트 중 오류가 발생했습니다.');
    },
    onSettled: () => {
      // 업데이트 이후에 데이터 갱신
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.profile() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER.auth() });
      setIsEditMode(false);
    },
  });
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  };

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
      setError('');
      let avatarUrl = null;
      
      // 이미지가 변경되었으면 먼저 업로드
      if (imageFile) {
        const imageResult = await imageMutation.mutateAsync(imageFile);
        avatarUrl = imageResult.url;
      }
      
      // 프로필 정보 업데이트
      await updateProfileMutation.mutateAsync({
        name,
        bio,
        avatar: avatarUrl || profileImage || undefined
      });
      
    } catch (error: any) {
      console.error('프로필 업데이트 오류:', error);
      setError('프로필 업데이트 중 오류가 발생했습니다.');
    }
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </Layout>
    );
  }
  
  if (fetchError) {
    return (
      <Layout>
        <div className="bg-red-500 bg-opacity-20 border border-red-400 text-red-100 p-4 rounded">
          사용자 정보를 가져오는데 실패했습니다.
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="container mx-auto max-w-2xl py-8">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-gray-700">
          {error && (
            <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-4 rounded-md mb-6">
              {error}
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">마이 페이지</h1>
            {!isEditMode ? (
              <button
                onClick={handleEditMode}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                <Edit size={16} />
                프로필 수정
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleCancelEdit}
                  className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  <X size={16} />
                  취소
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={updateProfileMutation.isLoading || imageMutation.isLoading}
                  className={`flex items-center gap-2 py-2 px-4 rounded-md transition-colors ${
                    updateProfileMutation.isLoading || imageMutation.isLoading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {updateProfileMutation.isLoading || imageMutation.isLoading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>저장 중...</span>
                    </>
                  ) : (
                    <>
                      <Save size={16} />
                      <span>저장</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* 프로필 정보 표시 (수정 모드에서도 동일한 레이아웃 유지) */}
          <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-6 mb-8">
            <div className="h-24 w-24 bg-purple-600 rounded-full relative flex items-center justify-center text-3xl font-bold uppercase text-white mx-auto md:mx-0 overflow-hidden">
              {(isEditMode ? profileImage : user?.profileImage) ? (
                <img 
                  src={isEditMode ? profileImage || '' : user?.profileImage || ''} 
                  alt={user?.name} 
                  className="h-full w-full object-cover" 
                />
              ) : (
                user?.name?.charAt(0) || user?.nickname?.charAt(0) || '?'
              )}
              
              {/* 수정 모드에서만 이미지 변경 가능 */}
              {isEditMode && (
                <label 
                  htmlFor="profileImage"
                  className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 cursor-pointer transition-opacity rounded-full"
                >
                  <Camera size={20} />
                  <span className="text-xs mt-1">이미지 변경</span>
                  <input
                    type="file"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              {isEditMode ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-700 border border-purple-400 rounded px-3 py-2 w-full mb-2 text-2xl font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="이름을 입력하세요"
                />
              ) : (
                <h2 className="text-2xl font-semibold">{user?.name || user?.nickname}</h2>
              )}
              <p className="text-gray-300 mb-2">{user?.email}</p>
              <p className="text-gray-400 text-sm">가입일: {formatDate(user?.createdAt)}</p>
            </div>
          </div>
          
          <div className="bg-gray-700 p-4 rounded-md mb-6">
            <h3 className="text-lg font-semibold mb-2">상세 정보</h3>
            {isEditMode ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full bg-gray-600 border border-purple-400 rounded p-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="자기소개를 입력하세요 (선택사항)"
              />
            ) : (
              <div>
                {user?.bio || '-'}
              </div>
            )}
          </div>
          
          <div className="text-center">
            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 px-6 py-2 rounded-md transition-colors"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UsersMePage; 