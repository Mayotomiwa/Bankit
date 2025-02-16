import { Navigate } from "react-router-dom";
import { Routes } from "../types/GeneralTypes";

const ProtectedRoute: React.FC<Routes> = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;
