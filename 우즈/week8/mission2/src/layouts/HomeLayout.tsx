import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

const HomeLayout = () => {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false);

  return (
    <div className="h-dvh flex flex-col">
      <Navbar onHoverChange={setIsSidebarHovered} />
      <div className="flex flex-1 relative">
        <Sidebar
          onHoverChange={setIsSidebarHovered}
          isOpen={isSidebarHovered}
        />
        <main
          className={`transition-all duration-300 flex-1 p-4 mt-10 ${
            isSidebarHovered ? "ml-64" : "ml-0"
          }`}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
