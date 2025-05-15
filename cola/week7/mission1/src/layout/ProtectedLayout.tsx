import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      if (!accessToken) {
        alert('로그인 후 이용해주세요.');
      }
      setIsLoading(false);
    };
    check();
  }, [accessToken]);

  return (
    <div className="flex flex-col h-dvh">
      <Navbar />
      <main className="flex-1">
        {isLoading ? (
          <div className="h-full p-5 bg-gray-900 text-white">로딩 중...</div> // ✅ Outlet 안 보여줌
        ) : !accessToken ? (
          <Navigate to="/login" replace />
        ) : (
          <Outlet />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default ProtectedLayout;
