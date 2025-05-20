import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  console.log(accessToken);

  if (!accessToken) {
    return <Navigate to={'/'} replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default ProtectedLayout;
