import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLPDetail, updateLP, uploadProfileImage } from '../api/lp';
import { QUERY_KEYS } from '../constants/queryKeys';
import { X, Image, Plus } from 'lucide-react';

const LPEditPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  // LP 데이터 불러오기
  const { data: lp, isLoading, isError } = useQuery(
    QUERY_KEYS.LP.detail(lpId || ''),
    () => getLPDetail(lpId || ''),
    {
      enabled: !!lpId,
      staleTime: 1000 * 60 * 5, // 5분간 캐싱
      retry: 1,
    }
  );

  // 초기 데이터 설정
  useEffect(() => {
    if (lp) {
      setTitle(lp.title || '');
      setContent(lp.content || '');
      setThumbnail(lp.thumbnail || null);
      setTags(lp.tags.map((tag) => tag.name) || []);
    }
  }, [lp]);

  // 이미지 업로드 mutation
  const imageMutation = useMutation({
    mutationFn: uploadProfileImage,
    onSuccess: (data) => {
      setThumbnail(data.url);
    },
    onError: (error: any) => {
      console.error('이미지 업로드 오류:', error);
      setError('이미지 업로드 중 오류가 발생했습니다.');
    }
  });

  // LP 업데이트 mutation
  const updateLPMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: any }) => updateLP(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(QUERY_KEYS.LP.detail(lpId || ''));
      queryClient.invalidateQueries(QUERY_KEYS.LP.lists());
      navigate(`/lp/${lpId}`);
    },
    onError: (error: any) => {
      console.error('LP 업데이트 오류:', error);
      setError(error.response?.data?.message || 'LP 업데이트 중 오류가 발생했습니다.');
    },
  });

  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedInput = tagInput.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      setTags([...tags, trimmedInput]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
      
      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setThumbnail(e.target.result as string);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    
    if (!content.trim()) {
      setError('내용을 입력해주세요.');
      return;
    }
    
    try {
      setError('');
      
      // 이미지가 변경되었으면 먼저 업로드
      let finalThumbnail = thumbnail;
      if (imageFile) {
        const uploadResult = await imageMutation.mutateAsync(imageFile);
        finalThumbnail = uploadResult.url;
      }
      
      // LP 업데이트
      await updateLPMutation.mutateAsync({
        id: lpId || '',
        data: {
          title,
          content,
          tags,
          thumbnail: finalThumbnail,
          published: true // 항상 true로 설정
        }
      });
    } catch (error: any) {
      console.error('LP 업데이트 오류:', error);
      setError('LP 업데이트 중 오류가 발생했습니다.');
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout>
        <div className="container mx-auto max-w-2xl py-8">
          <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-4 rounded-md">
            데이터를 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto max-w-2xl py-8">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">LP 수정</h1>
              <button 
                onClick={() => navigate(`/lp/${lpId}`)}
                className="text-gray-400 hover:text-white"
              >
                취소
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-4 rounded-md mb-6">
                  {error}
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">
                    제목 <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="제목을 입력하세요"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
                    내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="내용을 입력하세요"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    썸네일 이미지
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                    {thumbnail ? (
                      <div className="relative">
                        <img 
                          src={thumbnail} 
                          alt="썸네일 미리보기" 
                          className="max-h-48 rounded" 
                        />
                        <button
                          type="button"
                          onClick={() => setThumbnail(null)}
                          className="absolute top-2 right-2 p-1 bg-red-600 rounded-full text-white"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1 text-center">
                        <div className="flex text-sm text-gray-400">
                          <label
                            htmlFor="thumbnail"
                            className="relative cursor-pointer bg-gray-700 rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                          >
                            <span className="px-3 py-2 flex items-center">
                              <Image size={18} className="mr-2" />
                              이미지 업로드
                            </span>
                            <input
                              id="thumbnail"
                              name="thumbnail"
                              type="file"
                              accept="image/*"
                              className="sr-only"
                              onChange={handleImageChange}
                            />
                          </label>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF (최대 10MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    태그
                  </label>
                  <div className="flex flex-wrap gap-2 p-2 bg-gray-700 rounded-md mb-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-purple-600 text-white px-2 py-1 rounded-full text-sm flex items-center"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-white hover:text-red-200"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                    <div className="flex-1 min-w-[120px]">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagInputKeyDown}
                        placeholder="태그 입력 후 Enter"
                        className="w-full bg-transparent border-none outline-none text-white"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={addTag}
                    disabled={!tagInput.trim()}
                    className="text-sm text-purple-400 hover:text-purple-300 flex items-center"
                  >
                    <Plus size={16} className="mr-1" />
                    태그 추가
                  </button>
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={updateLPMutation.isLoading || imageMutation.isLoading}
                  className={`w-full py-3 font-medium rounded-md transition-colors ${
                    updateLPMutation.isLoading || imageMutation.isLoading
                      ? 'bg-gray-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600'
                  }`}
                >
                  {updateLPMutation.isLoading || imageMutation.isLoading ? '저장 중...' : '저장하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LPEditPage; 