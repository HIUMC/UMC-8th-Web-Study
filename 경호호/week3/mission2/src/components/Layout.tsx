import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout; 