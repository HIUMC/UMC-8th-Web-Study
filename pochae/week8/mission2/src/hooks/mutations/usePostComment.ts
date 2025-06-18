import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import { RequestCommentDto } from "../../types/comment";

function usePostComment() {
    const queryClient = useQueryClient(); // ✅ 추가

    return useMutation({
        mutationFn: postComment,

        onSuccess: (_data, variables: RequestCommentDto) => {
            alert("댓글 생성 완료");

            // ✅ 댓글 목록 캐시 무효화 → 자동으로 refetch 실행됨
            queryClient.invalidateQueries({ queryKey: ["comments", variables.lpId] });
        },

        onError: () => {
            alert("댓글 생성 실패");
        },
    });
}

export default usePostComment;
