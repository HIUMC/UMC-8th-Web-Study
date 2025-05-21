import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCheckLogin } from '../hooks/useCheckLogin';
import { useLpDetail } from '../hooks/useLpDetail';
import { useCommentsInfinite } from '../hooks/useCommentsInfinite';

export default function LpDetailPage() {
  const { lpid } = useParams<{ lpid: string }>();
  const lpId = Number(lpid);
  const navigate = useNavigate();

  // 로그인 체크
  const { isAuthenticated } = useCheckLogin();
  useEffect(() => {
    if (!isAuthenticated) {
      alert('이 기능은 로그인 후에만 이용 가능합니다.');
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) return null;


  const { data, isLoading, isError } = useLpDetail(lpId);
  
   // 댓글 무한 스크롤
   const [commentOrder, setCommentOrder] = useState<'asc' | 'desc'>('asc');
   const {
     data: commentPages,
     isLoading: commentsLoading,
     isError: commentsError,
     fetchNextPage,
     hasNextPage,
     isFetchingNextPage,
   } = useCommentsInfinite(lpId, commentOrder);

   const loadMoreRef = useRef<HTMLDivElement>(null);

  // 댓글 무한 스크롤 감지
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      {/* 뒤로가기 버튼 */}
      <button
        className="mb-4 text-sm text-blue-300 hover:underline"
        onClick={() => navigate(-1)}
      >
        ← 뒤로가기
      </button>

      {/* 로딩 / 에러 */}
      {isLoading && <p className="text-gray-400">로딩 중…</p>}
      {isError && <p className="text-red-400">불러오는 중 오류가 발생했습니다.</p>}

      {/* 상세 데이터 */}
      {data && (
        <article className="bg-gray-800 p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full h-64 object-cover rounded mb-4"
          />
          <p className="text-gray-300 mb-4">{data.content}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {data.tags.map((t) => (
              <span
                key={t.id}
                className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs"
              >
                #{t.name}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-400 mb-2">
            작성자: {data.author.name} ({data.author.email})
          </p>
          <p className="text-sm text-gray-400">
            작성일: {new Date(data.createdAt).toLocaleString()}
          </p>
        </article>
      )}

<article> 
      {/* 기존 상세 내용… */}

      {/* — 댓글 섹션 시작 — */}
      <section className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">댓글</h2>
          <button
            onClick={() => setCommentOrder(o => (o === 'asc' ? 'desc' : 'asc'))}
            className="px-3 py-1 bg-gray-700 text-sm rounded hover:bg-gray-600 transition"
          >
            {commentOrder === 'asc' ? '오래된순' : '최신순'}
          </button>
        </div>

        {/* 로딩 스켈레톤 (간단 예시) */}
        {commentsLoading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-800 p-4 rounded">
                <div className="h-4 bg-gray-700 rounded w-1/4 mb-2" />
                <div className="h-3 bg-gray-700 rounded w-3/4" />
              </div>
            ))}
          </div>
        )}

        {/* 댓글 리스트 */}
        {commentPages?.pages.map((page, pi) => (
          <React.Fragment key={pi}>
            {page.data.map(c => (
              <div key={c.id} className="mb-4 p-4 bg-gray-800 rounded">
                <p className="text-gray-200">{c.author.name} · {new Date(c.createdAt).toLocaleString()}</p>
                <p className="mt-1 text-white">{c.content}</p>
              </div>
            ))}
          </React.Fragment>
        ))}

        {/* 바닥 감지용 엘리먼트 */}
        <div ref={loadMoreRef} className="space-y-4 mt-4">
          {isFetchingNextPage &&
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-800 p-4 rounded">
                <div className="h-4 bg-gray-700 rounded w-1/4 mb-2" />
                <div className="h-3 bg-gray-700 rounded w-3/4" />
              </div>
            ))}
        </div>
      </section>
    </article>
    
    </div>
  );
}