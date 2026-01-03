import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth, UserRole } from "../../context/AuthContext";

interface ProtectedRouteProps {
    allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { isAuthenticated, user } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }

    if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard based on actual role
        if (user.role === "admin") return <Navigate to="/admin" replace />;
        if (user.role === "teacher") return <Navigate to="/teacher" replace />;
        if (user.role === "maintenance") return <Navigate to="/maintenance" replace />;

        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
