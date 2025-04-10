import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const RootLayout = () => {
  return (
    <>
      <div className="py-5 flex flex-col">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
