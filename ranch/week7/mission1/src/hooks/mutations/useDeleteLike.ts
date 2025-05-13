import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { ResponseLikeLpDto } from "../../types/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    onSuccess: (data:ResponseLikeLpDto)=>{
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY.lps,data.data.lpId],
                exact: true,
            });
        }
  }); 
}

export default useDeleteLike;