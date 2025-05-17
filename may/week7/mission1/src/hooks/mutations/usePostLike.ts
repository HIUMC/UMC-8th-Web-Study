import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { ResponseLikeLpDto } from "../../types/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    onSuccess: (data:ResponseLikeLpDto)=>{
        queryClient.invalidateQueries({
            queryKey: [QUERY_KEY.lps,data.data.lpId],
            exact: true,
        });
    }, 

  }); 
}

export default usePostLike;