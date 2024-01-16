import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedAuthRoutes = ({ children }) => {
  const state = useSelector((state) => state.user);
  const location = useLocation();

  return state?.role === 2000 ? (
    <Navigate to="/" state={{ from: location.pathname }} replace />
  ) : (
    children
  );
};

export default ProtectedAuthRoutes;
