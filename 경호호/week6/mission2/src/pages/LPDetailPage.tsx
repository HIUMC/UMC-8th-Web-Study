import { useParams, useNavigate } from 'react-router-dom';
import { useGetLPDetail } from '../hooks/useGetLPDetail';
import { Layout } from '../components/layout/Layout';
import { Heart, Edit, Trash } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LP, Like, LPDetailResponse } from '../types/lp';

// API 응답 타입을 types/lp.ts에서 가져옵니다

const LPDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const { data, isLoading, isError } = useGetLPDetail(lpId || '');
  const { isAuthenticated, user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();
  
  // 현재 사용자가 이 LP에 좋아요를 눌렀는지 확인
  useEffect(() => {
    if (data && user) {
      const lpData = data;
      const userLiked = lpData.likes?.some((like: Like) => like.userId === user.id) ?? false;
      setIsLiked(userLiked);
    }
  }, [data, user]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  if (isError || !data) {
    return (
      <Layout>
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-4 rounded-md">
          데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
        </div>
      </Layout>
    );
  }

  const lpData = data;

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{lpData.title || '제목 없음'}</h1>
                <div className="flex items-center text-gray-400 text-sm">
                  <span>작성자: {lpData.user?.nickname || '알 수 없음'}</span>
                  <span className="mx-2">•</span>
                  <span>작성일: {lpData.createdAt ? formatDate(lpData.createdAt) : '날짜 정보 없음'}</span>
                </div>
              </div>
              {isAuthenticated && (
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 rounded-full transition-colors ${isLiked ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-700 hover:bg-gray-600'}`}
                    title="좋아요"
                  >
                    <Heart size={20} className={isLiked ? 'text-white' : 'text-red-500'} />
                  </button>
                  
                  {user && user.id === lpData.userId && (
                    <>
                      <button 
                        className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                        title="수정하기"
                        onClick={() => navigate(`/lp/${lpData.id}/edit`)}
                      >
                        <Edit size={20} className="text-white" />
                      </button>
                      <button 
                        className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors"
                        title="삭제하기"
                        onClick={() => {
                          if (window.confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
                            // 삭제 로직 추가 예정
                            console.log('삭제 버튼 클릭됨');
                          }
                        }}
                      >
                        <Trash size={20} className="text-white" />
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {(lpData.thumbnail) && (
              <div className="mb-6 overflow-hidden rounded-md">
                <img 
                  src={lpData.thumbnail} 
                  alt={lpData.title || '이미지'} 
                  className="w-full h-auto object-cover rounded-md"
                  onError={(e) => {
                    // 이미지 로드 오류 시 기본 이미지 표시
                    e.currentTarget.src = 'https://via.placeholder.com/800x400?text=이미지를+찾을+수+없습니다';
                  }}
                />
              </div>
            )}

            <div className="bg-gray-700 p-4 rounded-md mb-6">
              <p className="whitespace-pre-line">{lpData.content}</p>
            </div>

            {lpData.tags && lpData.tags.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">태그</h3>
                <div className="flex flex-wrap gap-2">
                  {lpData.tags.map((tag) => (
                    <span 
                      key={tag.id} 
                      className="bg-purple-600 bg-opacity-50 px-3 py-1 rounded-full text-sm"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-semibold mb-2">좋아요</h3>
              <div className="flex items-center space-x-2">
                <div className="bg-gray-700 rounded-md p-3 inline-flex items-center">
                  <Heart size={16} className="text-red-500 mr-2" />
                  <span className="font-semibold">{lpData.likes?.length || 0}</span>
                </div>
                <p className="text-gray-400">명이 이 LP를 좋아합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LPDetailPage;
