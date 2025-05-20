import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { changeLPComment, deleteLPComment, getComments } from "../apis/auth";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

function LPComment() {

    const [commentSortOrder, setCommentSortOrder] = useState<'newest' | 'oldest'>('newest');
    const {username} =useAuth();
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    const [editComment, setEditComment] = useState<string | null>(null);
    const [editCommentId, setEditCommentId] = useState<string | null>(null);

    //댓글 삭제제
    const deleteMutation = useMutation({
        mutationFn: deleteLPComment,
        onSuccess: () => {
            console.log("댓글 삭제 성공");
            queryClient.invalidateQueries({ queryKey: ['lpComment', id] });
        }
    })

    //댓글 수정정
    const updateMutation = useMutation({
        mutationFn: changeLPComment,
        onSuccess: () => {
            setEditCommentId(null);
            setEditComment('');
            console.log("댓글 수정 성공");
            queryClient.invalidateQueries({ queryKey: ['lpComment', id] });
        }
    })

    //댓글 정렬
    const {
        data: commentData,
        error: commentError,
        isLoading: commentLoading,
        fetchNextPage: fetchNextComments,
        hasNextPage: hasMoreComments,
        isFetchingNextPage: fetchingNextComments
      } = useInfiniteQuery({
        queryKey: ['lpComment', id, commentSortOrder],
        queryFn: ({ pageParam }) => getComments({ 
            pageParam, 
            id:id!, 
            order: sortOrderToQueryParam(commentSortOrder) }),
        initialPageParam: null,
        getNextPageParam: (lastPage) => {
          if (!lastPage?.data?.hasNext) return undefined;
          return lastPage.data.nextCursor;
        }
      });

    const { ref: commentRef, inView: commentInView } = useInView({
        threshold: 0,
        rootMargin: '200px'
      });
      
      useEffect(() => {
        if (commentInView && hasMoreComments && !fetchingNextComments) {
          fetchNextComments();
        }
      }, [commentInView, hasMoreComments, fetchingNextComments, fetchNextComments]);
     
    //댓글 순서 정렬렬
      const sortOrderToQueryParam = (sortOrder: 'newest' | 'oldest'): 'asc' | 'desc' => {
        return sortOrder === 'newest' ? 'desc' : 'asc';
      }

      const sortedComments = commentData?.pages
      .flatMap(page => page.data?.data || []) || [];


    return(
        <div className="w-full">
            <div className="flex gap-2 mb-4 justify-end">
                <button 
                    onClick={() => setCommentSortOrder('newest')} 
                    className={`px-2 py-1 rounded text-sm ${commentSortOrder === 'newest' ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}>
                    최신순
                </button>
                <button 
                    onClick={() => setCommentSortOrder('oldest')} 
                    className={`px-2 py-1 rounded text-sm ${commentSortOrder === 'oldest' ? 'bg-gray-900 text-white' : 'bg-gray-200'}`}>
                    오래된순
                </button>
            </div>
            {commentLoading ? (
             // 로딩 중일 때
                <div>
                    {[...Array(3)].map((_, idx) => (
                        <div key={idx} className="w-full h-20 bg-gray-300 animate-pulse rounded mb-2"></div>
                    ))}
                </div>
                ) : commentError ? ( <div>댓글 에러 발생!</div>
                    ) : sortedComments.length === 0 ? ( // 데이터 없을 때
                            <div>
                                {[...Array(3)].map((_, idx) => (
                                    <div key={idx} className="w-full p-2 mb-2 rounded shadow-xl">
                                        <div className="font-semibold w-24 h-4 bg-gray-500 animate-pulse rounded"></div>
                                        <div className="text-sm w-full h-6 bg-gray-500 animate-pulse rounded mt-2"></div>
                                        <div className="text-xs w-16 h-3 bg-gray-500 animate-pulse rounded mt-1"></div>
                                    </div>
                                ))}
                            </div>
                            ) : (
                                <>
                                {sortedComments.map((comment: any) => (
                                    <div key={comment.id} className="w-full flex flex-wrap p-2 mb-2 bg-gray-200 rounded shadow">
                                        <div className="flex items-center gap-2 mb-1">
                                            <img 
                                                src={comment.author.profileImage || '/default-profile.png'} 
                                                alt="Profile" 
                                                className="w-8 h-8 rounded-full" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">{comment.author.name}</div>
                                            {editCommentId === comment.id ? (
                                                <>
                                                    <input
                                                        type="text"
                                                        value={editComment || ''}
                                                        onChange={(e)=> setEditComment(e.target.value)}
                                                        className="w-full p-2 border border-gray-300 rounded"
                                                        placeholder="댓글을 수정하세요...">
                                                    </input>
                                                    <div className="flex gap-2 mt-2">
                                                        <button
                                                            onClick={() => {
                                                                if (editComment?.trim() === '') return;
                                                                if (editComment) {
                                                                    updateMutation.mutate({ lpId: id!, commentId: comment.id, comment: editComment });
                                                                }
                                                            }}
                                                            className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg h-full">
                                                            수정
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setEditCommentId(null);
                                                                setEditComment('');
                                                            }}
                                                            className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg h-full">
                                                            취소
                                                        </button>
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="text-sm">{comment.content}</div>      
                                            )}
                                                                                      
                                            <div className="text-xs text-gray-500">{dayjs(comment.createdAt).fromNow()}</div>
                                        </div>
                                        {
                                            comment.author.name === username && (
                                                <div className="flex items-center gap-2 ml-auto">
                                                    <button
                                                        onClick={()=>{
                                                            setEditCommentId(comment.id);
                                                            setEditComment(comment.content);
                                                        }}>✏️</button>
                                                    <button
                                                        onClick={()=>deleteMutation.mutate({lpId: id!, commentId: comment.id})}>🗑️</button>
                                                </div>
                                            )
                                        }
                                    </div>
                                ))}
                                </>
                            )}
                
            <div ref={commentRef} className="h-10 w-full flex items-center justify-center">
                {fetchingNextComments && (
                    <div>
                        {[...Array(2)].map((_, idx) => (
                            <div key={idx} className="w-full h-20 bg-gray-300 animate-pulse rounded mb-2"></div>
                        ))}
                    </div>
                )}
            </div>
         </div>
)}

export default LPComment;