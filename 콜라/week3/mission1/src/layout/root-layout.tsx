import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const RootLayout = () => {
  return (
    <>
      <div className="py-3 flex flex-col gap-y-3">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
