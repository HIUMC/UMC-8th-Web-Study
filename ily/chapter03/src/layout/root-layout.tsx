import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const RootLayout = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
    </>
  );
};

export default RootLayout;
