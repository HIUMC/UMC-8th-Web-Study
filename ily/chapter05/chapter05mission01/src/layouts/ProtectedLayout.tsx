import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/login" replace />; // replace는 history를 남기지 않음.
  }
  return <Outlet />;
};

export default ProtectedLayout;
