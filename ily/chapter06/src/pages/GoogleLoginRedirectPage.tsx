import { useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { LOCAL_STORAGE_KEY } from "../constants/key";

const GoogleLoginRedirectPage = () => {
  const { setItem: setAccessToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.accessToken,
  );
  const { setItem: setRefreshToken } = useLocalStorage(
    LOCAL_STORAGE_KEY.refreshToken,
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(window.location.search);
    console.log(urlParams.get("name"));
    const accessToken = urlParams.get(LOCAL_STORAGE_KEY.accessToken);
    const refreshToken = urlParams.get(LOCAL_STORAGE_KEY.refreshToken);

    if (accessToken) {
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      //위 작업이 실행됐다는 것은 로그인이 됐다는 것으로 볼 수 있음.
      //그러니 로그인 했으니 홈으로 이동을 시킴
      window.location.href = "/";
    }
  }, [setAccessToken, setRefreshToken]);

  return <></>;
};

export default GoogleLoginRedirectPage;
