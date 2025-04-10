import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";

const RootLayout = () => {
  return (
    <>
      <div className="py-5 flex flex-col gap-y-8">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default RootLayout;
