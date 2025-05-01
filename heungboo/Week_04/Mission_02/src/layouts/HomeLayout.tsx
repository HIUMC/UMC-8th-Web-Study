import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

const HomeLayout = (): ReactElement => {
  return (
    <div className="h-dvh flex flex-col">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default HomeLayout;
