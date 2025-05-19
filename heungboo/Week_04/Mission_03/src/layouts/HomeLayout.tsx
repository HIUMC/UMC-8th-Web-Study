import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col justify-between">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>Footer 입니다.</footer>
    </div>
  );
};

export default HomeLayout;
