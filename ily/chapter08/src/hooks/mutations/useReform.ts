import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchUsers } from "../../apis/lp";

export const USER_QUERY_KEY = ["user"]; // 사용자 정보 쿼리 키

function useReform() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchUsers,

    // Optimistic Update 시작
    onMutate: async (newData: {
      name: string;
      bio: string;
      avatar: string;
    }) => {
      // 기존 쿼리 취소
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEY });

      // 이전 데이터 저장
      const previousUser = queryClient.getQueryData(USER_QUERY_KEY);

      // 캐시를 낙관적으로 업데이트
      queryClient.setQueryData(USER_QUERY_KEY, (old: any) => ({
        ...old,
        data: {
          ...old?.data,
          ...newData,
        },
      }));

      return { previousUser };
    },

    // 에러 시 롤백
    onError: (_err, _newData, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(USER_QUERY_KEY, context.previousUser);
      }
    },

    // 성공/실패 여부와 상관없이 쿼리 무효화
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEY });
    },
  });
}

export default useReform;
