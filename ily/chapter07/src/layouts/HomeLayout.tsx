import { Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { NavbarNotLoginned } from "../components/NavbarNotLoginned";
import { NavbarIsLoginned } from "../components/NavbarIsLoginned";
const HomeLayout = () => {
  const { accessToken } = useAuth();

  return (
    <div className="h-dvh flex flex-col">
      <nav></nav>
      {!accessToken && <NavbarNotLoginned />}
      {accessToken && <NavbarIsLoginned />}
      <main className="flex-1">
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default HomeLayout;
