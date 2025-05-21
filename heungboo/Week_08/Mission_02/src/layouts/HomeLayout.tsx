import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

import Sidebar from "../components/Sidebar";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col justify-between">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        <div>
          <Sidebar />
        </div>
        <main className="flex-grow overflow-auto h-full">
          <Outlet />
        </main>
      </div>
      <div>
        <Footer />
      </div>
      {/* <footer>Footer 입니다.</footer> */}
    </div>
  );
};

export default HomeLayout;
