import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(DataContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to={"/signin"} replace  />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={"/"} replace  />;
  }

  return children;
};

export default ProtectedRoute;
