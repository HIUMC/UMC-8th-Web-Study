import { useMutation } from '@tanstack/react-query';
import { updateComment } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';

function useUpdateComment() {
  return useMutation({
    mutationFn: updateComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, data.data.lpId],
        exact: true,
      });
    },
  });
}

export default useUpdateComment;
