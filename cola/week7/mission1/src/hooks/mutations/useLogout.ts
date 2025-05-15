import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';
import { useAuth } from '../../context/AuthContext';

function useLogout() {
  const { logout } = useAuth();

  return useMutation({
    mutationFn: async () => {
      await logout(); // ✅ 여기서 Promise 반환 보장
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myinfo],
        exact: true,
      });
    },
  });
}

export default useLogout;
