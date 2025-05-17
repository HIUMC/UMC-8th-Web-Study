import { useMutation } from '@tanstack/react-query';
import { deleteLike } from '../../apis/lp';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';
import { Likes, ResponseLpDetailsDto } from '../../types/lp';
import { ResponseMyInfoDto } from '../../types/auth';

function useDeleteLike() {
  return useMutation({
    mutationFn: deleteLike,
    // onMutate -> API 요청 이전에 호출되는 친구.
    // UI에 바로 변경을 보여주기 위해 cache 업데이트
    // mutate를 호출할 때 그 variables를 매개변수로 받음
    onMutate: async (lp) => {
      // 1. 이 게시글에 관련된 쿼리(캐시된 데이터를 새로 불러오는 요청)을 취소
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.lps, lp.lpId],
      });

      // 2. 현재 게시글의 데이터를 캐시에서 가져와야 한다.
      const previousLpPost = queryClient.getQueryData<ResponseLpDetailsDto>([
        QUERY_KEY.lps,
        lp.lpId,
      ]);

      // 3. 게시글 데이터를 복사해서 NewLpPost라는 새로운 객체를 만들거임.
      // 복사하는 가장 큰 이유는 나중에 오류가 생겼을 때 이전 상태로 되돌리기 위해서.
      const newLpPost = { ...previousLpPost };

      // 4. 게시글에 저장된 좋아요 목록에서 현재 내가 눌렀던 좋아요의 위치를 찾아야함.
      const me = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.myinfo,
      ]);
      const userId = Number(me?.data.id);

      const likedIndex =
        previousLpPost?.data.likes.findIndex(
          (like) => like.userId === userId
        ) ?? -1;

      if (likedIndex >= 0) {
        previousLpPost?.data.likes.splice(likedIndex);
      } else {
        const newLike = { userId, lpId: lp.lpId } as Likes;
        previousLpPost?.data.likes.push(newLike);
      }

      // 5. 업데이트된 게시글 데이터를 캐시에 저장
      // 이렇게하면 UI가 바로 업데이트 됨. 사용자가 변화를 확인할 수 있다.
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

    // onSettled는 API 요청이 끝난 후 성공하든 실패하든 실행
    onSettled: async (data, error, variables) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.lps, variables.lpId],
      });
    },
  });
}

export default useDeleteLike;
