import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestSigninDto } from "../types/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  login: (signinData: RequestSigninDto) => Promise<void>;
  logout: () => Promise<void>;
}

// 초기값 설정
export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useState<string | null>(localStorage.getItem(LOCAL_STORAGE_KEY.accessToken));
  const [refreshToken, setRefreshToken] = useState<string | null>(localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken));

  const login = async (signinData: RequestSigninDto) => {
    try {
      const response = await postSignin(signinData);
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response;

      localStorage.setItem(LOCAL_STORAGE_KEY.accessToken, newAccessToken);
      localStorage.setItem(LOCAL_STORAGE_KEY.refreshToken, newRefreshToken);

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);

      alert("로그인 성공");
      window.location.href = "/my"; 
    } catch (error) {
      console.error("로그인 오류", error);
      alert("로그인 실패");
    }
  };

  const logout = async () => {
    try {
      await postLogout();
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
      localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

      setAccessToken(null);
      setRefreshToken(null);

      alert("로그아웃 성공");
      navigate("/login"); 
    } catch (error) {
      console.error("로그아웃 오류", error);
      alert("로그아웃 실패");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      accessToken, 
      refreshToken, 
      isAuthenticated: !!accessToken, 
      login, 
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }
  return context;
};