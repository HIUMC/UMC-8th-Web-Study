import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar.tsx';

const RootLayout = () => {
  return (
    <>
      {/* 전역 effect들 추가할 수 있음 */}
      {/* ex) <ScrollToTop /> */}
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
