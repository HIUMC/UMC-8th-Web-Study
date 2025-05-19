import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App.tsx";
import { LPDETAILLIST } from "../../utils/types/lp";
import { ResponseMyInfoDto } from "../../utils/types/auth.ts";
import { LIKES } from "../../utils/types/lp";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,
    onMutate: async (lp) => {
      // optimistic update를 위한 onMutation 훅의 옵션 중 하나임.
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });
      //현재 게시글의 데이터를 캐시에 가져와야
      const previousLpPost = queryClient.getQueryData<LPDETAILLIST>([
        QUERY_KEY.lps,
      ]); // type을 지정해줘야 함.

      //게시글 데이터 복사 -> NewLpPost라는 새로운 객체를 만들기. -> 복사하는 이유는 나중에 에러가 발생했을 때 롤백하기 위함임.
      const newLpPost = { ...previousLpPost };

      //게시글에 저장된 좋아요 목록에서, 현재 내가 눌렀던 좋아요의 위치를 찾아야 함.
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);

      const userId = Number(me?.data.id);

      console.log("previousLpPost:", previousLpPost);

      const likedIndex: number | undefined =
        previousLpPost?.data?.likes.findIndex(
          (like: LIKES) => like.userId === userId,
        ) ?? -1;

      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1); // 좋아요 삭제
      } else {
        const newLike = { userId, lpId: lp.lpId } as LIKES; //as LIKES를 대입하면 type을 지정할 수 있는 것임.
        previousLpPost?.data.likes.push(newLike); // 좋아요 추가  이렇게 작성했을 때 에러가 발생...? -> type을 제대로 할당하지 못 해서 그런 것임. 윗 라인에 as LIKES를 추가해서 type을 지정해줌.
      }

      //업데이트된 게시글 데이터를 캐시에 저장
      //이렇게 하면 UI가 바로 업데이트 됨. 사용자가 변화를 확인할 수 있음.
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

      return { previousLpPost, newLpPost };
    },

    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpId],
        context?.previousLpPost?.data.id, //에러가 발생했을 때 롤백처리
      );
    },

    //onSettled API요청이 끝난 후 성공/실패 유무를 떠나서 항상 실행됨.
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}

export default usePostLike;

// // data -> API 성공 응답 데이터
// // variable -> mutate 에 전달한 값
// //context -> onMutate에서 반환한 값
// onSuccess: (data) => {
//   // variables:lpId LpDetailPage에서 variables = {lpId: Number(lpId)}가 되는데 이 값이 그대로 전달된다고 볼 수 있음.
//   queryClient.invalidateQueries({
//     queryKey: [QUERY_KEY.lps, data.data.lpId],
//     exact: true,
//     // 내가 좋아요를 누른 것이 전체적으로 반영되어야 할 때 목록에 해당하는 좋아요를 볼 때 이용함. exact: true,
//   });
// },

// //onError 요청 실패시 응답 값
// // 좋아요를 누르기 전의 상태들을 onError때 반환해주면 되지 않을까? 라는 생각이 들면 된다.

// onError: () => {},

// //요청이 실행되기 직전에 작동함.
// //
// onMutate: () => {
//   return "hello"; //context의 value로 해당 내용을 반환할 수 있음. onError의 경우에도 실패시 받아올 수 있는 건데,,,,
// },

// //요청이 끝난 후 항상 실행됨. finally와 같은 기능이라고 보면 될듯?
// //로딩 상태를 초기화 할 때 유용하게 사용됨.
// onSettled: () => {},
