import { PAGINATION_ORDER } from '../../enums/common';
import useGetInfiniteCommentList from '../../hooks/queries/useGetInfiniteCommentList';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import CommentSkeletonList from './CommentSkeletonList';
import CommentItem from './CommentItem';
import AddComment from './AddComment';

const CommentList = () => {
  const { lpId } = useParams<{ lpId: string }>();
  const [sortType, setSortType] = useState<PAGINATION_ORDER>(
    PAGINATION_ORDER.desc
  );
  const {
    data: comments,
    isFetching,
    hasNextPage,
    isPending,
    fetchNextPage,
    isError,
  } = useGetInfiniteCommentList(Number(lpId), 10, sortType);

  // ref -> 특정한 HTML 요소를 감시
  // inView -> 그 요소가 화면에 보이면 true, 아니면 false
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isError) return <h1>Error...</h1>;

  return (
    <div className="w-4/5 bg-gray-800 rounded-lg my-5 px-5 py-5 flex flex-col gap-4">
      <div className="flex justify-between">
        <div>댓글</div>
        <div className="flex gap-2">
          <button
            onClick={() => setSortType(PAGINATION_ORDER.asc)}
            className={`p-2 rounded-md cursor-pointer ${sortType === PAGINATION_ORDER.asc ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            오래된순
          </button>
          <button
            onClick={() => setSortType(PAGINATION_ORDER.desc)}
            className={`p-2 rounded-md cursor-pointer ${sortType === PAGINATION_ORDER.desc ? 'bg-white text-black' : 'bg-black text-white'}`}
          >
            최신순
          </button>
        </div>
      </div>
      <AddComment />
      <div className="flex flex-col gap-4">
        {isPending && <CommentSkeletonList count={10} />}
        {comments?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        {isFetching && <CommentSkeletonList count={10} />}
      </div>
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default CommentList;
