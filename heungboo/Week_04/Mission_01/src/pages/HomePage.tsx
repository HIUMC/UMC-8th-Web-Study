import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

const HomePage = (): ReactElement => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default HomePage;
