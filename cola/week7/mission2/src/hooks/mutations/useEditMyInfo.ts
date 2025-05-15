import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';
import { patchMyInfo } from '../../apis/auth';
import { ResponseMyInfoDto } from '../../types/auth';

function useEditMyInfo() {
  return useMutation({
    mutationFn: patchMyInfo,
    onMutate: async (updatedData) => {
      // 기존 캐시 쿼리 취소소
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.myinfo],
      });
      // 기존 캐시 데이터 저장장
      const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([
        QUERY_KEY.lps,
      ]);

      // 새로운 데이터 구성
      const newMyInfo: ResponseMyInfoDto = {
        ...(previousMyInfo as ResponseMyInfoDto),
        data: {
          id: previousMyInfo?.data?.id ?? 0,
          name: updatedData.name, // 새로 구성할 정보
          email: previousMyInfo?.data?.email ?? '',
          bio: updatedData.bio, // 새로 구성할 정보
          avatar: updatedData.avatar ?? '', // 새로 구성할 정보
          createdAt: previousMyInfo?.data?.createdAt ?? new Date(),
          updatedAt: new Date(), // 지금 시간으로 갱신
        },
      };

      // 캐시 데이터 업데이트
      queryClient.setQueryData([QUERY_KEY.myinfo], newMyInfo);
      return { previousMyInfo };
    },
    onError: (err, _, context) => {
      // 실패했을 경우, 이전 데이터로 롤백
      if (context?.previousMyInfo) {
        queryClient.setQueryData([QUERY_KEY.myinfo], context.previousMyInfo);
      }
    },
    onSettled: () => {
      // 최종적으로 서버에서 최신 데이터 다시 요청
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myinfo],
      });
    },
  });
}

export default useEditMyInfo;
