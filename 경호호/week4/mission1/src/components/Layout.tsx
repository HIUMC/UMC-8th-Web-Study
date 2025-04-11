import Navbar from "./Navbar";
import { Outlet } from "react-router-dom"; // <-- Outlet 임포트

// interface LayoutProps 제거

const Layout = () => { // <-- props 제거
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 flex-grow">
        <Outlet /> {/* <-- {children} 대신 Outlet 사용 */}
      </main>
    </div>
  );
};

export default Layout;
