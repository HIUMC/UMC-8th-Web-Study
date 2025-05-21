import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedLayout = () => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return (
      <>
        <div className="h-dvh flex flex-col">
          <nav></nav>
          <main className="flex-1">
            <Outlet />
          </main>
          <footer></footer>
        </div>
      </>
    ); // replace는 history를 남기지 않음.
  }
  return <Outlet />;
};

export default ProtectedLayout;
