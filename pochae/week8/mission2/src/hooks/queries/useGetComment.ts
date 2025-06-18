import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "../../apis/comment";
import { RequestCommentDto } from "../../types/comment";

function usePostComment() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postComment,

        onSuccess: (_data, variables: RequestCommentDto) => {
            alert("댓글 생성 완료");

            // ✅ "order"와 관계없이 전체 comments 쿼리를 무효화
            queryClient.invalidateQueries({ queryKey: ["comments", variables.lpId] });
        },

        onError: () => {
            alert("댓글 생성 실패");
        },
    });
}

export default usePostComment;
