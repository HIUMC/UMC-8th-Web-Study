import { useState, useRef } from "react";
import usePostComment from "../hooks/mutations/usePostComment";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import useGetComment from "../hooks/queries/useGetComment";
import type { Comment } from "../types/comment";

const LpComment = ({ lpId }: { lpId: number }) => {
  const [order, setOrder] = useState<"latest" | "oldest">("latest");
  const [content, setContent] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: commentData } = useGetComment(lpId, order);
  const comments: Comment[] = commentData?.data || [];

  const accessToken = localStorage.getItem("accessToken");
  const { data: me } = useGetMyInfo(accessToken);

  const { mutate: postComment } = usePostComment();

  const handleSubmit = () => {
    if (!content.trim()) return;
    postComment(
      { lpId, content },
      {
        onSuccess: () => {
          setContent("");
          inputRef.current?.focus(); // UX 향상: 작성 후 입력창 포커스
        },
      }
    );
  };

  return (
    <div className="bg-[#1E1E1E] p-4 rounded-md text-white mt-10 w-[500px] mx-auto">
      {/* 댓글 입력창 */}
      <div className="flex items-center mb-4 gap-2">
        <input
          ref={inputRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="댓글을 입력해주세요"
          className="flex-1 px-3 py-2 rounded-md bg-gray-700 text-white"
        />
        <button
          onClick={handleSubmit}
          className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-md"
        >
          작성
        </button>
      </div>

      {/* 정렬 토글 */}
      <div className="flex justify-end mb-2 text-sm">
        <button
          onClick={() => setOrder(order === "latest" ? "oldest" : "latest")}
          className="text-gray-300"
        >
          {order === "latest" ? "오래된순" : "최신순"}
        </button>
      </div>

      {/* 댓글 목록 */}
      <ul className="space-y-3">
        {comments.map((c) => (
          <li key={c.id} className="border-b border-gray-700 pb-2">
            <div className="flex items-center gap-2 mb-1">
              <img
                src={c.user.avatarUrl}
                alt="avatar"
                className="w-6 h-6 rounded-full"
              />
              <span className="font-semibold">{c.user.name}</span>
              {c.user.id === me?.data.id && (
                <span className="text-pink-400 text-xs ml-2">내가 썼음!</span>
              )}
            </div>
            <p className="text-sm text-gray-300">{c.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LpComment;
