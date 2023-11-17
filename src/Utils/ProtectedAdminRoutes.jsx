import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedAdminRoutes = ({ children }) => {
  const { isloggedIn } = useSelector((state) => state.admin);
  const location = useLocation();

  return isloggedIn ? (
    <Navigate
      to="/admin/dashboard"
      state={{ from: location.pathname }}
      replace
    />
  ) : (
    children
  );
};

export default ProtectedAdminRoutes;
