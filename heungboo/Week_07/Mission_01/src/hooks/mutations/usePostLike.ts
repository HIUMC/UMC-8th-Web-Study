import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";

function usePostLike() {
  return useMutation({
    // mutation은 콜백 할 필요 X
    mutationFn: postLike,
    // data -> API 성공 응답 데이터
    // variables -> mutate에 전달한 값
    // context -> onMutate에서 반환한 값

    // QUERY_KEY.lps만만 매칭되면 다 처리됨?
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, data.data.lpId],
        // 갱신 안해줌
        exact: true,
      });
    },
    // error -> 요청 실패 시 발생한 에러 (AxiosError)
    // variables -> mutate에 전달한 값 (lpIp)
    // context -> onMutate에서 반환한 값 (undefined)
    // onError: (error, variables, context) => {},

    // 요청이 실행되기 직전에 실행되는 함수  -> 좋아요 누르면 좋아요 전에 hi 입력됨? =>  Optimistic Update를 구현할 때 유용
    // 서버 데이터 요청 전에 무조건 될 거라고 보고 UI 를 먼저 업그레이드 시킴
    // context 로 반환함.
    // onMutate: (variables) => {
    //   console.log("hi");
    // },
    // 요청이 끝난 후 항상 실행됨 (OnSuccess, onError 이후에 실행됨) -> 로딩 상태를 초기화 할 때 조금 유용함
    // onSettled: (data, error, variables, context) => {},
  });
}

export default usePostLike;
