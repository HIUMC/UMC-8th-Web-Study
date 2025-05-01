import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const {accessToken} = useAuth();

  if(!accessToken) {
    return <Navigate to={"/login"} replace />;
    // replace는 현재 페이지를 기록하지 않고 새로운 페이지로 이동
  }

  return <Outlet />;
};

export default ProtectedLayout;
