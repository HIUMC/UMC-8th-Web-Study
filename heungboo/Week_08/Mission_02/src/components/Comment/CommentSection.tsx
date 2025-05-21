import React, { useState } from "react";
import useInfiniteComments from "../../hooks/queries/useInfiniteComments";
import CommentList from "./CommentList";
import CommentInput from "./CommentInput";
import { PAGINATION_ORDER } from "../../enums/commons";

interface CommentSectionProps {
  lpId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ lpId }) => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);

  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteComments(lpId, order);

  return (
    <div className="w-full max-w-5xl bg-white border border-gray-300 rounded-lg p-6 mt-6">
      {/* 정렬 버튼 */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setOrder(PAGINATION_ORDER.asc)}
          className={`px-4 py-2 rounded-l-md ${
            order === PAGINATION_ORDER.asc
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          오래된 순
        </button>
        <button
          onClick={() => setOrder(PAGINATION_ORDER.desc)}
          className={`px-4 py-2 rounded-r-md ${
            order === PAGINATION_ORDER.desc
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          최신 순
        </button>
      </div>

      {/* 댓글 입력란 */}
      <CommentInput lpId={lpId} />

      {/* 댓글 리스트 */}
      <CommentList
        comments={comments?.pages.flatMap((page) => page.data.data) || []}
      />
      {isFetchingNextPage && <div>Loading more comments...</div>}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          더 보기
        </button>
      )}
    </div>
  );
};

export default CommentSection;
