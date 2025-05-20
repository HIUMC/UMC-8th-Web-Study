import { useEffect } from "react";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";

const GoogleLoginRedirectPage = () => {
  const {setItem: setAccessToken} = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken,  
  );

  const {setItem: setRefreshToken} = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken,
  );

  useEffect(()=>{
    const useParams = new URLSearchParams(window.location.search);
    const accessToken = useParams.get("accessToken");
    const refreshToken = useParams.get("refreshToken");

    if(accessToken && refreshToken){
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      window.location.href = "/my";
    }
  }, [setAccessToken, setRefreshToken]);

  return (
    <div>
      구글 리다이렉트 로그인 페이지
    </div>
  );
};

export default GoogleLoginRedirectPage;


