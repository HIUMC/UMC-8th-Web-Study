import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import useGetComments from "../hooks/queries/useGetComments";
import usePostComment from "../hooks/mutations/usePostComment";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import { useAuth } from "../context/AuthContext";
import { Heart, Pencil, Trash } from "lucide-react";
import { useState } from "react";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();

  const {
    data: lp,
    isPending,
    isError,
  } = useGetLpDetail({ lpId: Number(lpId) });

  const { data: me } = useGetMyInfo(accessToken!);
  const { mutate: likeMutate } = usePostLike();
  const { mutate: dislikeMutate } = useDeleteLike();
  const { mutateAsync: postComment } = usePostComment();
  const { data: comments, refetch: refetchComments } = useGetComments(
    Number(lpId),
    accessToken
  );

  const [commentText, setCommentText] = useState("");
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest");

  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  const handleLikeLp = () => {
    likeMutate({ lpId: Number(lpId) });
  };

  const handleDislikeLp = () => {
    dislikeMutate({ lpId: Number(lpId) });
  };

  const handleSubmitComment = async () => {
    if (!commentText.trim()) return;

    try {
      await postComment({
        lpId: Number(lpId),
        content: commentText,
        token: accessToken!,
      });
      setCommentText("");
      await refetchComments(); // 최신 댓글 갱신
    } catch {
      alert("댓글 등록에 실패했습니다.");
    }
  };

  if (isPending && isError) return <></>;

  const sortedComments = [...(comments?.data.data || [])].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">{lp?.data.title}</h1>
      <img
        src={lp?.data.thumbnail}
        alt={lp?.data.title}
        className="my-4 w-full"
      />
      <p>{lp?.data.content}</p>

      {/* 🔽 태그 영역 */}
      {Array.isArray(lp?.data.tags) && lp.data.tags.length > 0 && (
        <div className="mt-4 mb-4 flex flex-wrap gap-2">
          {lp.data.tags.map((tag: { id: number; name: string }) => (
            <span
              key={tag.id}
              className="px-2 py-1 bg-gray-200 text-sm rounded-full text-gray-700"
            >
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      {/* 좋아요 버튼 */}
      <button
        className="mt-2"
        onClick={isLiked ? handleDislikeLp : handleLikeLp}
      >
        <Heart
          color={isLiked ? "red" : "black"}
          fill={isLiked ? "red" : "transparent"}
        />
      </button>

      {/* 댓글 영역 */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">댓글</h2>

        {/* 정렬 선택 */}
        <div className="flex items-center justify-between mb-2">
          <select
            className="border px-2 py-1 rounded text-sm"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(e.target.value as "latest" | "oldest")
            }
          >
            <option value="oldest">오래된순</option>
            <option value="latest">최신순</option>
          </select>
        </div>

        {/* 댓글 입력창 */}
        <textarea
          className="w-full border p-2 rounded"
          rows={3}
          placeholder="댓글을 입력하세요"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSubmitComment}
        >
          댓글 작성
        </button>

        {/* 댓글 목록 */}
        <ul className="mt-6 space-y-4">
          {sortedComments.map(
            (comment: {
              id: number;
              content: string;
              authorId: number;
              createdAt: string;
              author?: { name: string };
            }) => (
              <li
                key={comment.id}
                className="p-3 border rounded shadow-sm relative"
              >
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold">
                    {comment.author?.name ?? "익명"}
                  </div>

                  {/* 본인 댓글일 경우 수정/삭제 버튼 */}
                  {comment.authorId === me?.data.id && (
                    <div className="flex gap-2">
                      <button className="hover:text-blue-500">
                        <Pencil size={16} />
                      </button>
                      <button className="hover:text-red-500">
                        <Trash size={16} />
                      </button>
                    </div>
                  )}
                </div>
                <div className="mt-1">{comment.content}</div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default LpDetailPage;
