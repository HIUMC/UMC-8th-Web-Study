import { useMutation } from '@tanstack/react-query';
import { deleteComment } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';

function useDeleteComment() {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, variables.lpId],
        exact: true,
      });
    },
  });
}

export default useDeleteComment;
