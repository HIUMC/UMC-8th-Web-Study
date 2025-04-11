import Navbar from "./Navbar";
// ReactNode 제거, Outlet 임포트
import { Outlet } from "react-router-dom"; 

// LayoutProps 인터페이스 제거 또는 children 제거
// interface LayoutProps {
// }

// props에서 children 제거
const Layout = () => { 
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-6 flex-grow">
        {/* children 대신 Outlet 사용 */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default Layout;
