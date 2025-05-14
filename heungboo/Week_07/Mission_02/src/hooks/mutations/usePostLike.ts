import { useMutation } from "@tanstack/react-query";
import { postLike } from "../../apis/lp";
import { queryClient } from "../../App";
import { QUERY_KEY } from "../../constants/key";
import { Likes, ResponseLpDto } from "../../types/lp";
import { ResponseMyInfoDto } from "../../types/auth";

function usePostLike() {
  return useMutation({
    mutationFn: postLike,

    // onMutate -> API 요청 이전에 호출 됨 => UI에 바로 변경을 보여주기 위해 API 요청 전에 Cache 업데이트
    onMutate: async (lp) => {
      // 1. 이 게시글에 관련된 쿼리를 취소 (캐시된 데이터를 새로 불러오는 요청을 취소) , 이 쿼리는 useQuery에서 사용한 쿼리 키와 동일해야 함
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });

      // 2. 현재 게시글의 데이터를 캐시에서 가져옴 => 이 데이터는 API 요청 이전의 데이터임 + 캐쉬에서 UI를 업데이트하기 위해 사용
      const previousLpPost = queryClient.getQueryData<ResponseLpDto>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);

      // 게시글 데이터를 복사해서 NewLpPost라는 새로운 객체를 만듦 ㅡ < 복사하는 가장 큰 이유 > 나중에 오류가 발생했을 때 이전 상태로 되돌리기 위해서
      const newLpPost = { ...previousLpPost };

      // 게시글에 저장된 좋아요 목록에서 현재 내가 좋아요를 눌렀는지 확인
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myInfo,
      ]);
      const userId = Number(me?.data.id);

      // index 는 0부터 -> -1 : 좋아요를 누르지 않은 상태
      const likedIndex =
        previousLpPost?.data.likes.findIndex(
          (like: Likes) => like.userId === userId
        ) ?? -1;

      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex, 1);
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }

      console.log(newLpPost);
      // 업데이트된 게시글 데이터를 캐시에 저장
      // 이렇게 하면 UI가 바로 업데이트 됨, 사용자가 변화를 확인할 수 있음
      queryClient.setQueryData([QUERY_KEY.lps, lp.lpId], newLpPost);

      return { previousLpPost, newLpPost };
    },

    onError: (err, newLp, context) => {
      console.log(err, newLp);
      queryClient.setQueryData(
        [QUERY_KEY.lps, newLp.lpId],
        context?.previousLpPost?.data.id
      );
    },

    // onSettled는 API 요청이 끝난 후 성공유무에 상관없이 실행
    onSettled: async (data, error, variables, context) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}

export default usePostLike;
