import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../apis/axios";
import { LocalStorageKey } from "../constants/key";

// 서버 로그아웃 + 클라이언트 토큰 삭제 + 리디렉트까지 한 방에
export function useLogout() {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      // 1) 서버에 Refresh Token 폐기 요청
      await axiosInstance.post(
        "/v1/auth/signout",
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.error("signout error", err);
    } finally {
      // 2) 클라이언트 쪽 토큰 삭제
      localStorage.removeItem(LocalStorageKey.accessToken);
      localStorage.removeItem(LocalStorageKey.refreshToken);
      // 3) 로그인 페이지로 이동
      navigate("/login", { replace: true });
    }
  };

  return logout;
}