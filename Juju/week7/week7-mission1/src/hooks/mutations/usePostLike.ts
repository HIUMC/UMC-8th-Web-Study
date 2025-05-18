import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,

    onSuccess: (data /*, variables, context*/) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
      });
    },

    onError: (/*rror, variables, context*/) => {},

    onMutate: (/*variables*/) => {
      console.log("hi");
    },

    onSettled: (/*data, error, variables, context*/) => {},
  });
}

export default usePostLike;