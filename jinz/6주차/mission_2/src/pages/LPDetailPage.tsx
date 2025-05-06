import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
dayjs.extend(relativeTime);

const fetchLPdetail = async (id:any) => {
    const res = await fetch(`http://localhost:8000/v1/lps/${id}`);
    return res.json();
}

const fetchLPcomments = async ({ pageParam = null, id }: { pageParam: string | null, id: string }) => {
    const res = await fetch(`http://localhost:8000/v1/lps/${id}/comments?cursor=${pageParam || ''}`);
    return res.json();
  };

function LPdetailComponet() {
    const {id} = useParams();
    const [commentSortOrder, setCommentSortOrder] = useState<'newest' | 'oldest'>('newest');
        
    const {data, isLoading, error} = useQuery({
        queryKey: ['lpDetail', id],
        queryFn: () => fetchLPdetail(id),
    })

    const {
        data: commentData,
        error: commentError,
        isLoading: commentLoading,
        fetchNextPage: fetchNextComments,
        hasNextPage: hasMoreComments,
        isFetchingNextPage: fetchingNextComments
      } = useInfiniteQuery({
        queryKey: ['lpComment', id],
        queryFn: ({ pageParam }) => fetchLPcomments({ pageParam, id }),
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

      const sortedComments = commentData?.pages
      .flatMap(page => page.data?.items || [])
      .sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return commentSortOrder === 'newest' ? dateB - dateA : dateA - dateB;
      }) || [];

    if(!id) return <div>id가 없습니다.</div>;
    if(isLoading) return <div>로딩 중...</div>;
    if(error) return <div> 에러 발생... ㅜㅜㅜ</div>;
    if(!data || !data.status || !data.data) return <div>데이터가 없습니다.</div>;

    const createdAt = data.data.createdAt || new Date();
    const daysAgo = dayjs(createdAt).fromNow();

    return(
    <div>
        <div className="flex flex-col items-center w-200 p-6 bg-gray-300 rounded-lg shadow-md">
            {/* 상단 바 */}
            <div className="w-full flex items-center justify-between  mb-4">
                <div className="flex items-center gap-2 font-semibold"> {data.data.author.name}</div>
                <div className="flex items-center gap-4 text-gray-900 text-sm">
                    <span>{daysAgo}</span>
                </div>
            </div>
            <div className="w-full flex items-center justify-between  mb-4">
                <h2 className="flex items-center gap-2 font-bold mb-4">title: {data.data.title}</h2>
                <div className="flex items-center gap-4 text-gray-900 text-sm">
                    <button>✏️</button>
                    <button>🗑️</button>
                </div>
            </div>

            <div className="flex flex-col items-center mb-4 w-100 p-4 bg-gray-300 rounded-lg shadow-2xl">
                <img 
                    src={'/sza.jpg'}
                    className="w-80 h-80 object-cover mb-4 rounded-full" />
            </div>
            <div className="w-full mb-4 text-sm">content: {data.data.content} </div>
            <div className="flex flex-wrap gap-2 mb-4"> tags : 
                {data.data.tags?.map((tag:any)=>(
                    <span
                        key={tag.id}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                        #{tag.name}
                    </span>
                ))}
            </div> 
            <div className="flex items-center gap-1">♥{data.data.likes?.length}</div>
        </div>

        <div className="flex flex-col items-center w-200 p-6 bg-gray-300 rounded-lg shadow-md mt-6">
            <div className="w-full flex items-center justify-between  mb-4">
                <div className="flex items-center gap-2 font-semibold"> 댓글</div>
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
            </div>

            <div className="w-full flex items-center gap-2  mb-4">
                <input 
                    type="text" 
                    placeholder="댓글을 입력하세요..." 
                    className="flex-grow p-2 border border-balck rounded-lg " />  
                <button className="px-4 py-2 bg-gray-500 text-white text-sm rounded-lg h-full">작성</button>
            </div>

            <div className="w-full">
                {commentLoading ? (
                    <div>
                    {[...Array(3)].map((_, idx) => (
                        <div key={idx} className="w-full h-20 bg-gray-300 animate-pulse rounded mb-2"></div>
                    ))}
                    </div>
                ) : commentError ? (
                    <div>댓글 에러 발생!</div>
                ) : commentData?.pages.flatMap(page => page.data?.items || []).length === 0 ? (
                    // 데이터 없을 때
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
                        <div key={comment.id} className="w-full p-2 mb-2 bg-white rounded shadow">
                        <div className="font-semibold">{comment.author.name}</div>
                        <div className="text-sm">{comment.content}</div>
                        <div className="text-xs text-gray-500">{dayjs(comment.createdAt).fromNow()}</div>
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

            



        </div>
    </div>
    )
}

const LPDetailPage=() => {
    return(
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <LPdetailComponet/>
        </div>
    )
}

export default LPDetailPage;