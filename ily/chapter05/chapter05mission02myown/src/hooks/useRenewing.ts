import { useEffect, useRef } from "react";
import axios from "axios";

const useRenewingAuth = () => {
  const intervalRef = useRef<number | null>(null); // <-- 여기 수정

  const fetchToken = async () => {
    console.log("Token fetching...");
    // 여기에 서버에 refresh 요청 보내는 코드 작성

    console.log(
      localStorage.getItem("accessToken"),
      "RenewingAuth 내부에서 실행된 콘솔",
    );
    let refreshToken = localStorage.getItem("refreshToken");

    try {
      console.log("post요청");
      console.log("저장된 refreshToken값", refreshToken);
      const res = await axios.post("http://localhost:8000/v1/auth/refresh", {
        headers: { "Content-Type": "application/json" },
        refresh: refreshToken,
      });
      console.log(res.data);

      const accessToken = res.data.data.accessToken;
      refreshToken = res.data.data.refreshToken;
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      } else {
        console.error("Failed to set refreshToken: refreshToken is null");
      }
      localStorage.setItem("accessToken", accessToken);
      console.log("바꾼 accessToken", accessToken);
      console.log("바꾼 refreshToken", refreshToken);
    } catch (e) {
      console.log(e, "accesstoken renewing error");
      return 0;
    }
  };
  const startRenewing = () => {
    if (!intervalRef.current) {
      fetchToken();
      intervalRef.current = window.setInterval(fetchToken, 3000);
    }
  };

  return { startRenewing };
};
export default useRenewingAuth;
