import { useMutation } from "@tanstack/react-query";
import { postLogout } from "../../apis/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
function useLogout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return useMutation({
    mutationFn: postLogout,
    onSuccess: () => {
      logout();
      navigate("/login");
    },
    onError: (error) => {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    },
  });
}

export default useLogout;

export const patchMyInfo = async (body: { name: string; bio?: string; avatar?: string }) => {
  const { data } = await axiosInstance.patch("/v1/users/me", body);
  return data;
};