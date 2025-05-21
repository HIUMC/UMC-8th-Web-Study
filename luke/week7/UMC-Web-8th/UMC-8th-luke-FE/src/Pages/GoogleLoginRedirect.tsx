import { LocalStorageKey } from "../constants/key";


const GoogleLoginRedirect = () => {  
  
  const urlParams = new URLSearchParams(window.location.search);
  const accessToken = urlParams.get(LocalStorageKey.accessToken);
  const refreshToken = urlParams.get(LocalStorageKey.refreshToken);

  if (accessToken && refreshToken) {
    localStorage.setItem(LocalStorageKey.accessToken, accessToken);
    localStorage.setItem(LocalStorageKey.refreshToken, refreshToken);
    window.location.href = "/mypage"; // 로그인 성공 시 MyPage로 이동
  } else {
    console.error("Access token or refresh token not found in URL parameters.");
  }
  return(
    <div>
    </div>
  )
}
export default GoogleLoginRedirect;