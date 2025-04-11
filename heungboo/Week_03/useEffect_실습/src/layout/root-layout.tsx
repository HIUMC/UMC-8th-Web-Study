import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <NavBar />
    </>
  );
};

export default RootLayout;
