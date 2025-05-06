import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const { accessToken } = useAuth(); //access토큰이 있는 지 확인

    if(!accessToken) { 
       return <Navigate to="/login" replace />
    } //없다면 로그인 페이지로 강제 이동

    return children; //있다면 보호된 children 페이지 렌더링
}

export default ProtectedRoute;