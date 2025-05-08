import { postLogout } from "../apis/auth";
import { LocalStorageKey } from "../constants/key";

/**
 * 로그아웃 처리 유틸
 * 1) 서버에 signout 요청 (Refresh Token 쿠키 폐기)
 * 2) 클라이언트 localStorage의 Access/Refresh Token 삭제
 */
export const doLogout = async (): Promise<void> => {
  localStorage.removeItem(LocalStorageKey.accessToken);
  localStorage.removeItem(LocalStorageKey.refreshToken);
  try {
    await postLogout();  // 서버 쪽 Refresh Token 폐기
  } catch (err) {
    console.error("signout error", err);
  }
};