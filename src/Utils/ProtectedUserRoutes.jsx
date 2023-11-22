import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedUserRoutes = ({ children }) => {
  const { id } = useSelector((state) => state.user);
  const location = useLocation();

  return !id ? (
    <Navigate to="/" state={{ from: location.pathname }} replace />
  ) : (
    children
  );
};

export default ProtectedUserRoutes;
