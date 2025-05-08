import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App.tsx";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    // data -> API 성공 응답 데이터
    // variable -> mutate 에 전달한 값
    //context -> onMutate에서 반환한 값
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        exact: true,
        // 내가 좋아요를 누른 것이 전체적으로 반영되어야 할 때 목록에 해당하는 좋아요를 볼 때 이용함. exact: true,
      });
    },

    //onError 요청 실패시 응답 값
    onError: () => {},

    //요청이 실행되기 직전에 작동함.
    onMutate: () => {
      return "hello";
    },

    //요청이 끝난 후 항상 실행됨. finally와 같은 기능이라고 보면 될듯?
    //로딩 상태를 초기화 할 때 유용하게 사용됨.
    onSettled: () => {},
  });
}

export default usePostLike;
