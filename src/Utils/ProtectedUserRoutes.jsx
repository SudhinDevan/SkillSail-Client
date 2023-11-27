import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedUserRoutes = ({ children }) => {
  const state = useSelector((state) => state.user);

  const location = useLocation();

  return !state.role ? (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  ) : (
    children
  );
};

export default ProtectedUserRoutes;
