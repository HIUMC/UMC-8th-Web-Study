import { Navigate, useLocation } from "react-router-dom";
import { getProtected } from "../apis/auth";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
}) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await getProtected();
        if (response.status) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("보호된 경로 접근 실패:", error);
      }
    };

    checkAuth();
  }, [location]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
