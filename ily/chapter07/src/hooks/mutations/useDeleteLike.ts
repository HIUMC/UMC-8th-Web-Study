import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
        // 내가 좋아요를 누른 것이 전체적으로 반영되어야 할 때 목록에 해당하는 좋아요를 볼 때 이용함. exact: true,
      });
    },
  });
}

export default useDeleteLike;
