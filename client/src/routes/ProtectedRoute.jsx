import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  redirectPath = "/login",
  children,
  allowedRoles = [],
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while auth state is being determined
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check if user exists
  if (!user) {
    // Save the attempted URL for redirecting after login
    const currentPath = location.pathname + location.search + location.hash;
    return <Navigate to={redirectPath} state={{ from: currentPath }} replace />;
  }

  // If roles are specified, check if user has required role
  if (allowedRoles.length > 0) {
    const userRoles = user.customClaims?.roles || [];
    const hasRequiredRole = allowedRoles.some((role) =>
      userRoles.includes(role)
    );

    if (!hasRequiredRole) {
      return (
        <div className="flex h-screen w-full items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Access Denied</h1>
            <p className="text-gray-600 mt-2">
              You don't have permission to access this page.
            </p>
          </div>
        </div>
      );
    }
  }

  // If there are children, render them, otherwise render the Outlet
  return children || <Outlet />;
};

export default ProtectedRoute;
