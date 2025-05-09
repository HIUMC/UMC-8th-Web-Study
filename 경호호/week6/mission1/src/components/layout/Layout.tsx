import { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {

  const isCentered = window.location.pathname.includes('/users/me');

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className={`flex-1 p-6 transition-all duration-300 ${
          isCentered ? 'flex justify-center items-center' : ''
        }`}>
          {children}
        </main>
      </div>
    </div>
  );
};
