import { createContext, PropsWithChildren, useContext, useState } from "react";
import { RequestLoginDto } from "../types/auth";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { postLogout, postSignin } from "../apis/auth";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login:(signinData: RequestLoginDto) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login:async() => {},
  logout: async() => {},
});

export const AuthProvider = ({children}: PropsWithChildren) => {
  const{
    getItem: getAccessTokenFromStorage,
    setItem: setAccessTokenInStorage,
    removeItem: removeAccessTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);

  const{
    getItem: getRefreshTokenFromStorage,
    setItem: setRefreshTokenInStorage,
    removeItem: removeRefreshTokenFromStorage,
  } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

  const [accessToken, setAccessToken] = useState<string | null>(
    getAccessTokenFromStorage()
  );

  const [refreshToken, setRefreshToken] = useState<string | null>(
    getRefreshTokenFromStorage()
  );

  const login = async(signinData: RequestLoginDto) => {
    try{
      const {data} = await postSignin(signinData);

      if(data){
        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;
      

      setAccessTokenInStorage(newAccessToken);
      setRefreshTokenInStorage(newRefreshToken);

      setAccessToken(newAccessToken);
      setRefreshToken(newRefreshToken);
      alert("로그인에 성공했습니다.");
      window.location.href = "/my";
    }
    }catch(error){
      console.error("로그인 오류", error);
      alert("로그인에 실패했습니다.");
    }
  };

  const logout = async() => {
    try {
      // 로그아웃 API 호출 시도
      try {
        await postLogout();
      } catch (error) {
        console.log('로그아웃 API 호출 실패, 로컬 로그아웃 진행');
      }
      
      // 로컬 스토리지에서 토큰 제거
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      
      // 상태 업데이트
      setAccessToken(null);
      setRefreshToken(null);
      
      alert("로그아웃되었습니다.");
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 오류", error);
      // API 호출 실패해도 로컬 로그아웃은 진행
      removeAccessTokenFromStorage();
      removeRefreshTokenFromStorage();
      setAccessToken(null);
      setRefreshToken(null);
      alert("로그아웃되었습니다.");
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider value={{accessToken, refreshToken, login, logout}}>
      {children}
    </AuthContext.Provider>
  );  
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context){
    throw new Error("AuthContext를 찾을 수 없습니다.");
  }
  return context;
};

