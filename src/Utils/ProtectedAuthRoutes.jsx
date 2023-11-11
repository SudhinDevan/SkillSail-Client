import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedAuthRoutes = ({ children }) => {
  const { id } = useSelector((state) => state);
  const location = useLocation();

  return id ? (
    <Navigate to="/" state={{ from: location.pathname }} replace />
  ) : (
    children
  );
};

export default ProtectedAuthRoutes;
