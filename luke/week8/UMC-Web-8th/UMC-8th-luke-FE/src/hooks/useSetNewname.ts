import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMyName } from '../apis/auth';
import type { ResponseMyInfoDto } from '../types/auth';

export function useSetNewname() {
  const qc = useQueryClient();

  return useMutation<ResponseMyInfoDto, Error, { name: string }>({
    // 1) mutationFn을 옵션 객체 안에 넣습니다
    mutationFn: ({ name }) => updateMyName({ name }),

    // 2) onMutate: 뮤테이션 직전 실행
    onMutate: async ({ name: newName }) => {
      await qc.cancelQueries({ queryKey: ['myInfo'] });
      const previous = qc.getQueryData<ResponseMyInfoDto>(['myInfo']);
      qc.setQueryData<ResponseMyInfoDto>(['myInfo'], old =>
        old ? {...old, data: {  ...old.data, name: newName,},}: old
      );
      localStorage.setItem('name', newName);
      return { previous };
    },

    // 3) onError: 실패 시 롤백
    onError: (_err, _vars, context: any) => {
      if (context?.previous) {
        qc.setQueryData(['myInfo'], context.previous);
        localStorage.setItem('userName', context.previous.name);
      }
    },

    // 4) onSettled: 성공/실패 상관없이 서버와 재동기화
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['myInfo'] });
    },
  });
}
