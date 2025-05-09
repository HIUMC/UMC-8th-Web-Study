import { useParams } from 'react-router-dom';
import { useGetLPDetail } from '../hooks/useGetLPDetail';
import { Layout } from '../components/layout/Layout';
import { Heart, Edit, Trash } from 'lucide-react';

interface LpData {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tags: {
    id: string;
    name: string;
  }[];
  likes: {
    id: string;
    userId: string;
  }[];
  user: {
    id: string;
    nickname: string;
    profileImage?: string;
  };
}

const LPDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const { data, isLoading, isError } = useGetLPDetail(lpId || '');

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

  if (isError || !data || !data.data) {
    return (
      <Layout>
        <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-4 rounded-md">
          데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
        </div>
      </Layout>
    );
  }

  const lpData = data.data as LpData;

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-2">{lpData.title}</h1>
                <div className="flex items-center text-gray-400 text-sm">
                  <span>작성자: {lpData.user.nickname}</span>
                  <span className="mx-2">•</span>
                  <span>작성일: {formatDate(lpData.createdAt)}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Heart size={20} className="text-red-500" />
                </button>
                <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Edit size={20} />
                </button>
                <button className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors">
                  <Trash size={20} />
                </button>
              </div>
            </div>

            <div className="bg-gray-700 p-4 rounded-md mb-6">
              <p className="whitespace-pre-line">{lpData.content}</p>
            </div>

            {lpData.tags.length > 0 && (
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
              <p>{lpData.likes.length}명이 이 LP를 좋아합니다.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LPDetailPage;
