import React, { useState } from "react";
import { RequestCreateCommentDto } from "../../types/comment";
import { usePostComment } from "../../hooks/mutations/usePostComment";

const CommentInput: React.FC<RequestCreateCommentDto> = ({ lpId }) => {
  const [content, setContent] = useState(""); // 댓글 내용 상태
  const postCommentMutation = usePostComment(); // 댓글 작성 훅

  const handleSubmit = () => {
    if (!content.trim()) {
      alert("댓글 내용을 입력해주세요 ! !");
      return;
    }
    console.log("댓글 작성 요청 데이터:", { lpId });
    postCommentMutation.mutate(
      { lpId },
      {
        onSuccess: () => {
          setContent(""); // 댓글 작성 후 입력창 초기화
        },
        onError: (error) => {
          console.error("댓글 작성 실패:", error); // 오류 메시지 출력
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center mt-6 ">
      <input
        className="flex-grow p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="댓글을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        className="ml-4 px-4 py-4 bg-gray-300 text-white rounded-lg hover:bg-blue-600"
        onClick={handleSubmit}
      >
        작성
      </button>
    </div>
  );
};

export default CommentInput;
