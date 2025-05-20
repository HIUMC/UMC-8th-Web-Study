import { useMutation } from "@tanstack/react-query";
import { deleteLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function useDeleteLike(){
  return useMutation({
    mutationFn: deleteLike,
    //onMutate -> API 요청 전 호출됨
    //UI에 바로 보여주기 위해 캐시 업데이트
    onMutate:async (lp) => {
    //1. 이 게시글에 관련된 쿼리를 취소 (캐시된 데이터를 새로 불러오는 요청)
    await queryClient.cancelQueries({
      queryKey: [QUERY_KEY.lps, lp.lpId],
    });

    //2. 캐시에서 데이터 가져오기
    const previousLpPost = queryClient.getQueryData<ResponseLpDto>([QUERY_KEY.lps, lp.lpId]);

    //3. 게시글 데이터를 복사해서 NewLpPost라는 새로운 객체를 만들 것임.
    // 복사하는 가장 큰 이유는 나중에 오류가 발생했을 때, 이전 상태로 되돌리기 위해서viousLpPost;
    const newLpPost = {...previousLpPost};

    // 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치 찾기
    const me = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo,]);

    const userId = Number(me?.data.id);

    const likeIndex =
    previousLpPost?.data.likes.findIndex(
      (like) => like.userId === userId,
    ) ?? -1

    if(likeIndex >= 0){ //if 만족하면 좋아요 취소
      previousLpPost?.data.likes.splice(likeIndex, 1);
    } else{ //if 만족하지 않으면 좋아요 추가
      const newLike = {userId, lpId:lp.lpId} as unknown as Likes; // 왜 강의처럼 as Likes; 하면 안 되지?
      previousLpPost?.data.likes.push(newLike);
    }

    // 업데이트된 게시글 데이터를 캐시에 저장
    // 이렇게 하면 UI가 바로 업데이트 됨, 사용자가 변화를 확인할 수 있음.
    queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

    return {previousLpPost, newLpPost};
    },

    // 오류가 발생했을 때 이전 상태로 되돌리기(롤백)
    onError:(err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData([QUERY_KEY.lps, newLp.lpId], context?.previousLpPost?.data.id); //강의에서는 newLP.lpId말고 lp.lpId로 했는데 내가 하면 오류남;; 뭐임
      /*코드를 보니 onMutate 함수의 매개변수로 lp를 받고 있어서 그 스코프 내에서는 lp를 사용할 수 있습니다.
      하지만 onError 함수는 다른 스코프이기 때문에 여기서는 lp에 접근할 수 없습니다.
      onError 함수에서는 실패한 mutation의 변수를 newLp로 받고 있으니, 이것이 onMutate에서 사용한 lp와 동일한 데이터입니다.
      따라서 newLp를 사용해야 합니다:*/
    },

    // 성공하든 실패하든 무조건 실행되는 함수
    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}

export default useDeleteLike;
