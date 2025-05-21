import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingButton from "../components/FloatingButton";
import Sidebar from "../components/Sidebar";

const ProtecetLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    alert("로그인이 필요한 서비스입니다. 로그인을 해주세요!");
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-dvh flex flex-col justify-between">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div>
          <Sidebar />
        </div>
        <main className="flex-grow overflow-auto h-full">
          <Outlet />
        </main>
      </div>
      <div>
        <Footer />
        <FloatingButton />
      </div>
      {/* <footer>Footer 입니다.</footer> */}
    </div>
  );
};

export default ProtecetLayout;
