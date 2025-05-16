import { useMutation } from '@tanstack/react-query';
import { addComment } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';

function useAddComment() {
  return useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lpComments, data.lpId],
        exact: true,
      });
      console.log(data);
    },
  });
}

export default useAddComment;
