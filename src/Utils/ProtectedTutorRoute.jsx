import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedTutorRoute = ({ children }) => {
  const state = useSelector((state) => state.user);

  const location = useLocation();
  return !(state.role === 3000) ? (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  ) : (
    children
  );
};

export default ProtectedTutorRoute;
