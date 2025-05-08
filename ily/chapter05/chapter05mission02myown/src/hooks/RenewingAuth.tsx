import { useEffect } from "react";
import axios from "axios";

const RenewingAuth = () => {
  useEffect(() => {
    const fetchToken = async () => {
      console.log(
        localStorage.getItem("accessToken"),
        "RenewingAuth 내부에서 실행된 콘솔",
      );
      const refreshToken = localStorage.getItem("refreshToken");

      try {
        const res = await axios.post("http://localhost:8000/v1/auth/refresh", {
          refresh: refreshToken,
        });

        const accessToken = res.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        console.log(accessToken);
      } catch (e) {
        console.log(e, "accesstoken rewing error");
      }
    };

    fetchToken();

    const Interval = setInterval(() => {
      fetchToken();
    }, 3000);
    return () => clearInterval(Interval);
  }, []);
};

export default RenewingAuth;
