import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const accessToken = params.get("accessToken");
        const refreshToken = params.get("refreshToken");
        


        if (accessToken && refreshToken) {
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            navigate("/mypage"); // 로그인 성공시 마이페이지로 이동 
        } else {
            console.error('구글 콜백이 토큰 찾기 실패');
            navigate("/login"); // 로그인 실패시 로그인 페이지로 이동
        }
    }, [location, navigate]);

    return <div>구글 로그인 처리... 중 ...</div>;

}

export default GoogleCallback;