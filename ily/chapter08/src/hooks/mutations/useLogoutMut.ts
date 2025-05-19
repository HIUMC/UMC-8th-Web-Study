import { useMutation } from "@tanstack/react-query";
import { postSignout } from "../../apis/auth";
import { useAuth } from "../../context/AuthContext";

function useLogoutMut() {
  const { logout } = useAuth();
  return useMutation({
    mutationFn: logout,
  });
}

export default useLogoutMut;
