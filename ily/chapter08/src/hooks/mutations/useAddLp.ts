import { useMutation } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import { postAddLp } from "../../apis/lp";

function useAddLp() {
  return useMutation({
    mutationFn: postAddLp,
    onSuccess: (data) => {
      // queryClient.invalidateQueries({
      //   queryKey: [QUERY_KEY.lps, data.data.lpId],
      //   exact: true,
      // });
    },
    onError: (error) => {
      console.error("Error adding LP:", error);
    },
  });
}

export default useAddLp;
