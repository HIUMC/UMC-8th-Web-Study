import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: ReactNode
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const { accessToken } = useAuth();

    if(!accessToken) { 
        return <Navigate to="/login" replace />
    }

    return children;
}

export default ProtectedRoute;