import { useParams, useNavigate } from 'react-router-dom';
import { useGetLPDetail } from '../hooks/useGetLPDetail';
import { Layout } from '../components/layout/Layout';
import { Heart, Edit, Trash, Send, MessageCircle, MoreVertical } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Like, PaginationOrder } from '../types/lp';
import { useInfiniteComments } from '../hooks/useInfiniteComments';
import CommentSkeletonCard from '../components/CommentSkeletonCard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createComment, deleteComment, updateComment } from '../api/comment';
import { QUERY_KEYS } from '../constants/queryKeys';
import { deleteLP, toggleLike } from '../api/lp';

const LPDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const { data, isLoading, isError } = useGetLPDetail(lpId || '');
  const { isAuthenticated, user } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentOrder, setCommentOrder] = useState<PaginationOrder>(PaginationOrder.DESC);
  const [commentText, setCommentText] = useState('');
  const [editingComment, setEditingComment] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  
  const { 
    data: commentsData, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage, 
    isLoading: isCommentsLoading,
    isError: isCommentsError
  } = useInfiniteComments({
    lpId: lpId || '',
    order: commentOrder,
    limit: 5
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);
  
  useEffect(() => {
    if (data && user) {
      const lpData = data;
      const userLiked = lpData.likes?.some((like: Like) => like.userId === user.id) ?? false;
      setIsLiked(userLiked);
      setLikeCount(lpData.likes?.length || 0);
    }
  }, [data, user]);

  const createCommentMutation = useMutation({
    mutationFn: ({ lpId, content }: { lpId: string, content: string }) =>
      createComment(lpId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMENT.infiniteList({ lpId: lpId || '', order: commentOrder })
      });
    },
    onError: (error) => {
      console.error('댓글 작성 오류:', error);
      alert('댓글 작성 중 오류가 발생했습니다.');
    },
  });

  const updateCommentMutation = useMutation({
    mutationFn: ({ lpId, commentId, content }: { lpId: string, commentId: number, content: string }) =>
      updateComment(lpId, commentId, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMENT.infiniteList({ lpId: lpId || '', order: commentOrder })
      });
      setEditingComment(null);
      setEditedCommentText('');
    },
    onError: (error) => {
      console.error('댓글 수정 오류:', error);
      alert('댓글 수정 중 오류가 발생했습니다.');
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: ({ lpId, commentId }: { lpId: string, commentId: number }) =>
      deleteComment(lpId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.COMMENT.infiniteList({ lpId: lpId || '', order: commentOrder })
      });
    },
    onError: (error) => {
      console.error('댓글 삭제 오류:', error);
      alert('댓글 삭제 중 오류가 발생했습니다.');
    },
  });

  const toggleLikeMutation = useMutation({
    mutationFn: (lpId: string) => toggleLike(lpId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.LP.detail(lpId || '') });
      const previousLpData = queryClient.getQueryData(QUERY_KEYS.LP.detail(lpId || ''));
      
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);
      
      if (newIsLiked) {
        setLikeCount(prev => prev + 1);
      } else {
        setLikeCount(prev => Math.max(0, prev - 1));
      }
      
      queryClient.setQueryData(QUERY_KEYS.LP.detail(lpId || ''), (old: any) => {
        if (!old) return old;
        
        const userId = user?.id;
        
        if (!userId) return old;
        
        let updatedLikes;
        
        if (newIsLiked) {
          updatedLikes = [...(old.likes || []), { id: `temp-${Date.now()}`, userId }];
        } else {
          updatedLikes = (old.likes || []).filter((like: Like) => like.userId !== userId);
        }
        
        return {
          ...old,
          likes: updatedLikes
        };
      });
      
      return { previousLpData, previousIsLiked: isLiked };
    },
    onError: (error: any, _variables, context) => {
      queryClient.setQueryData(QUERY_KEYS.LP.detail(lpId || ''), context?.previousLpData);
      setIsLiked(context?.previousIsLiked || false);
      
      if (data) {
        setLikeCount(data.likes?.length || 0);
      }
      
      console.error('좋아요 처리 중 오류:', error);
      
      if (error.response && error.response.status === 409) {
        return;
      }
      
      if (error.code === 'ERR_NETWORK') {
        alert('네트워크 연결을 확인해주세요.');
        return;
      }
      
      alert('좋아요 처리 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LP.detail(lpId || '') });
    }
  });

  const deleteLPMutation = useMutation({
    mutationFn: (id: string) => deleteLP(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.LP.lists() });
      navigate('/');
    },
    onError: (error: any) => {
      console.error('LP 삭제 중 오류:', error);
      alert(error.message || 'LP 삭제 중 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  });

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    createCommentMutation.mutate(
      { lpId: lpId || '', content: commentText },
      {
        onSuccess: () => {
          setCommentText('');
        }
      }
    );
  };

  const handleEditComment = useCallback((comment: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(null);
    setEditingComment(comment.id);
    setEditedCommentText(comment.content);
  }, []);

  const cancelEditComment = () => {
    setEditingComment(null);
    setEditedCommentText('');
  };

  const submitEditComment = (commentId: number) => {
    if (!editedCommentText.trim()) return;
    
    updateCommentMutation.mutate({
      lpId: lpId || '',
      commentId,
      content: editedCommentText
    });
  };

  const handleDeleteComment = useCallback((commentId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      deleteCommentMutation.mutate({ lpId: lpId || '', commentId });
      setOpenMenuId(null);
    }
  }, [lpId, deleteCommentMutation]);

  const toggleMenu = useCallback((commentId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenMenuId(prevId => prevId === commentId ? null : commentId);
  }, []);

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.comment-menu') && !target.closest('.menu-button')) {
        setOpenMenuId(null);
      }
    };
    
    document.addEventListener('click', handleGlobalClick);
    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const toggleCommentOrder = () => {
    setCommentOrder(commentOrder === PaginationOrder.DESC ? PaginationOrder.ASC : PaginationOrder.DESC);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleLikeToggle = () => {
    if (!isAuthenticated) {
      alert('로그인 후 이용 가능합니다.');
      return;
    }
    
    // 좋아요 버튼에 애니메이션 효과 추가
    const heartButton = document.querySelector('.heart-button');
    const heartIcon = document.querySelector('.heart-icon');
    
    if (heartButton && heartIcon) {
      heartButton.classList.add('animate-pulse-once');
      setTimeout(() => {
        heartButton.classList.remove('animate-pulse-once');
      }, 500);
    }
    
    toggleLikeMutation.mutate(lpId || '');
  };

  const handleDeleteLP = () => {
    if (window.confirm('정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      deleteLPMutation.mutate(lpId || '');
    }
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
                  <span>작성자: {lpData.user?.nickname || lpData.author?.nickname || lpData.author?.name || lpData.user?.id || '알 수 없음'}</span>
                  <span className="mx-2">•</span>
                  <span>작성일: {lpData.createdAt ? formatDate(lpData.createdAt) : '날짜 정보 없음'}</span>
                </div>
              </div>
              {isAuthenticated && (
                <div className="flex space-x-2">
                  <button 
                    onClick={handleLikeToggle}
                    className={`heart-button p-2 rounded-full transition-all duration-300 ${
                      isLiked 
                        ? 'heart-button-liked hover:bg-red-600' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    title="좋아요"
                  >
                    <Heart 
                      size={20} 
                      className={`heart-icon ${isLiked ? 'text-white' : 'text-red-500'}`} 
                    />
                  </button>
                  
                  {user && (user.id === lpData.userId || user.id === lpData.authorId || user.id === lpData.user?.id) && (
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
                        onClick={handleDeleteLP}
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

            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-2">좋아요</h3>
              <div className="flex items-center space-x-2">
                <div className="bg-gray-700 rounded-md p-3 inline-flex items-center">
                  <Heart 
                    size={20} 
                    className={`mr-2 transition-all duration-300 ${isLiked 
                      ? "heart-icon-liked" 
                      : "text-red-500"}`} 
                  />
                  <span className="font-semibold">{likeCount}</span>
                </div>
                <p className="text-gray-400">명이 이 LP를 좋아합니다.</p>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">댓글</h3>
                <button
                  onClick={toggleCommentOrder}
                  className="bg-purple-600 px-3 py-1 text-xs rounded-md hover:bg-purple-700 transition-colors"
                >
                  {commentOrder === PaginationOrder.DESC ? '최신순' : '오래된순'}
                </button>
              </div>
              
              {isAuthenticated && (
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <div className="flex items-center bg-gray-700 rounded-md overflow-hidden mb-4">
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="댓글을 작성해주세요"
                      className="flex-1 bg-transparent p-3 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="p-3 bg-purple-600 hover:bg-purple-700 transition-colors"
                      disabled={!commentText.trim()}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </form>
              )}
              
              {isCommentsLoading && !commentsData && (
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <CommentSkeletonCard key={index} />
                  ))}
                </div>
              )}
              
              {isCommentsError && (
                <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-4 rounded-md">
                  댓글을 불러오는 중 오류가 발생했습니다. 다시 시도해주세요.
                </div>
              )}
              
              {commentsData && commentsData.pages && commentsData.pages.length > 0 && (
                <div className="space-y-4">
                  {commentsData.pages.flatMap((page) => 
                    page.comments && Array.isArray(page.comments) 
                      ? page.comments 
                      : []
                  ).map((comment) => {
                    const userId = user ? Number(user.id) : null;
                    
                    return (
                      <div key={comment.id} className="bg-gray-800 rounded-lg p-4 relative">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white mr-2">
                            {comment.author && comment.author.avatar ? (
                              <img 
                                src={comment.author.avatar} 
                                alt={comment.author.name} 
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <MessageCircle size={14} />
                            )}
                          </div>
                          <div>
                            <span className="font-medium">{comment.author ? comment.author.name : '익명'}</span>
                            <span className="text-xs text-gray-400 ml-2">
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          
                          {userId === comment.authorId && (
                            <div className="absolute right-4 top-4 z-20">
                              <div className="relative comment-menu">
                                <button 
                                  className="p-1 hover:bg-gray-700 rounded-full w-7 h-7 flex items-center justify-center menu-button"
                                  onClick={(e) => toggleMenu(comment.id, e)}
                                  tabIndex={0}
                                  role="button"
                                  aria-label="댓글 메뉴"
                                >
                                  <MoreVertical size={16} />
                                </button>
                                {openMenuId === comment.id && (
                                  <div className="absolute right-0 top-full bg-gray-700 rounded shadow-lg z-30 w-24 py-1 mt-1 comment-menu">
                                    <button 
                                      className="flex items-center px-3 py-2 w-full text-left hover:bg-gray-600 text-sm"
                                      onClick={(e) => handleEditComment(comment, e)}
                                      tabIndex={0}
                                    >
                                      <Edit size={14} className="mr-2" />
                                      수정
                                    </button>
                                    <button 
                                      className="flex items-center px-3 py-2 w-full text-left hover:bg-gray-600 text-red-400 text-sm"
                                      onClick={(e) => handleDeleteComment(comment.id, e)}
                                      tabIndex={0}
                                    >
                                      <Trash size={14} className="mr-2" />
                                      삭제
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        {editingComment === comment.id ? (
                          <div className="mt-2">
                            <textarea
                              value={editedCommentText}
                              onChange={(e) => setEditedCommentText(e.target.value)}
                              className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-white"
                              rows={2}
                            />
                            <div className="flex justify-end mt-2 space-x-2">
                              <button
                                onClick={cancelEditComment}
                                className="px-3 py-1 bg-gray-600 rounded hover:bg-gray-500"
                              >
                                취소
                              </button>
                              <button
                                onClick={() => submitEditComment(comment.id)}
                                className="px-3 py-1 bg-purple-600 rounded hover:bg-purple-700"
                                disabled={!editedCommentText.trim()}
                              >
                                저장
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-300">{comment.content}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              
              {commentsData && commentsData.pages.flatMap((page) => page.comments).length === 0 && (
                <div className="text-center py-6">
                  <p className="text-gray-400">첫 번째 댓글을 작성해보세요!</p>
                </div>
              )}
              
              {isFetchingNextPage && (
                <div className="mt-4 space-y-4">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <CommentSkeletonCard key={`loading-${index}`} />
                  ))}
                </div>
              )}
              
              <div ref={observerTarget} className="h-4 mt-4"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LPDetailPage;
