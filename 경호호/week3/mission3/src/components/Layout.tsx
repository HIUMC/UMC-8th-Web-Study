import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <Navbar />
      <main className="flex-grow w-full">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout; 