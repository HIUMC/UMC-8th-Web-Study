import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCreateComment } from "../../apis/comment";
import {
  RequestCreateCommentDto,
  ResponseCreateCommentDto,
} from "../../types/comment";

export const usePostComment = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseCreateCommentDto, Error, RequestCreateCommentDto>({
    mutationFn: postCreateComment,
    onSuccess: (data) => {
      console.log("댓글 작성 성공:", data);
      alert("댓글이 성공적으로 작성되었습니다!");

      // 댓글 목록을 다시 가져와 최신 상태로 유지
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
    onError: (error) => {
      console.error("댓글 작성 실패:", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
    },
  });
};
