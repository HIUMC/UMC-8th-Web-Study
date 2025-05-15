import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';
import { patchMyInfo } from '../../apis/auth';

function useEditMyInfo() {
  return useMutation({
    mutationFn: patchMyInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myinfo],
        exact: true,
      });
    },
  });
}

export default useEditMyInfo;
