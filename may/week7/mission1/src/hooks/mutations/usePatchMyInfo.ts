import { useMutation } from "@tanstack/react-query";
import { patchMyInfo } from "../../apis/auth";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePatchMyInfo() {
  return useMutation({
    mutationFn: patchMyInfo,
    onSuccess: () => {
      alert("정보가 수정되었습니다.");
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.myInfo] });
    },
    onError: () => {
      alert("정보 수정에 실패했습니다.");
    },
  });
}

export default usePatchMyInfo;