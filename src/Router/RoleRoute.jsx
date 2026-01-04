import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../Auth/AuthProvider";

const RoleRoute = ({ allowedRoles, children }) => {
  const { user, loading, role, roleLoading } = useContext(AuthContext);
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-base-100">
        <span className="loading loading-spinner text-success w-12 h-12"></span>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleRoute;
