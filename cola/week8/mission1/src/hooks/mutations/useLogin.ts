import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../App';
import { QUERY_KEY } from '../../constants/key';
import { useAuth } from '../../context/AuthContext';

function useLogin() {
  const { login } = useAuth();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myinfo],
        exact: true,
      });
    },
  });
}

export default useLogin;
