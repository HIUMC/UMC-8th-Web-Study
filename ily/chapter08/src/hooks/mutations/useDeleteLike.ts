import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { QUERY_KEY } from "../../constants/key";
import { queryClient } from "../../App";
import { LPwithAUTHOR, LPDETAILLIST } from "../../utils/types/lp";
import { ResponseMyInfoDto } from "../../utils/types/auth";
import { LIKES } from "../../utils/types/lp";

function useDeleteLike() {
  return useMutation(
    {
      mutationFn: deleteLike,

      //onMutate -> API 요청 이전에 호출되는 옵션, 더 정확히는 mutationFn이 실행되기 직전에 실행된다고 보는 게 맞음.
      // 이렇게 하는 이유는 UI를 즉각적으로 변경시키기 위함임.
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
    },

    // onMutate : -> API호출 이전에 호출되는 친구
    //그렇게 UI에 바로 변경을 보여주기 위해 cache 업데이트를 함.
    //mutationFn에서 호출될 수 있으므로 onMutate는 mutationFn이 실행되기 전에 실행된다고 볼 수 있음.
  );
}

export default useDeleteLike;
