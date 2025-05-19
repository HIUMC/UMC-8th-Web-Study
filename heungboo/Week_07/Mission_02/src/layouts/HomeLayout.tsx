import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";

import Sidebar from "../components/Sidebar";

const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col justify-between">
      <NavBar />
      <div className="flex flex-1 overflow-hidden">
        {/* 왼쪽 사이드바 */}
        <div className="flex-shrink-0 w-1/10">
          <Sidebar mode="inline" />
        </div>

        {/* 오른쪽 콘텐츠 영역 */}
        <main className="flex-grow overflow-auto">
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
