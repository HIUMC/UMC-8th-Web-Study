import { useMutation } from '@tanstack/react-query';
import { addComment } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';
import { Comment, ResponseCommentListDto } from '../../types/lp';
import { ResponseMyInfoDto } from '../../types/auth';

function usePostComment() {
  return useMutation({
    mutationFn: addComment,
    // comment: 내가 쿼리에 담아서 보낸 데이터
    onMutate: async (comment) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lpComments, comment.lpId],
      });

      const previousCommentPost =
        queryClient.getQueryData<ResponseCommentListDto>([
          QUERY_KEY.lpComments,
          comment.lpId,
        ]);

      const newCommentPost = { ...previousCommentPost };

      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myinfo,
      ]);

      const userId = Number(me?.data.id);
      const author = me?.data;

      const newComment: Comment = {
        id: Date.now(),
        content: comment.body.content,
        lpId: comment.lpId,
        authorId: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        author: {
          id: userId,
          name: author!.name,
          email: author!.email,
          bio: author?.bio ?? null,
          avatar: author?.avatar ?? null,
          createdAt: author!.createdAt,
          updatedAt: author!.updatedAt,
        },
      };

      newCommentPost.data?.data.push(newComment);

      queryClient.setQueryData(
        [QUERY_KEY.lpComments, comment.lpId],
        newCommentPost
      );

      return { previousCommentPost };
    },

    onError: (error, variables, context) => {
      console.error('댓글 등록 실패:', error);

      // 이전 상태로 롤백
      if (context?.previousCommentPost) {
        queryClient.setQueryData(
          [QUERY_KEY.lpComments, variables.lpId],
          context.previousCommentPost
        );
      }
    },

    onSettled: async (data, error, variables) => {
      // 댓글 목록을 다시 받아오게끔 무효화 처리
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, variables.lpId],
      });
    },
  });
}

export default usePostComment;
