import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const ProtectedLayout = () => {
  const {accessToken} = useAuth();

  if(!accessToken) {
    return <Navigate to={"/login"} replace />;
    // replace는 현재 페이지를 기록하지 않고 새로운 페이지로 이동
  }

  return(
    <div className = "h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  )
};

export default ProtectedLayout;
