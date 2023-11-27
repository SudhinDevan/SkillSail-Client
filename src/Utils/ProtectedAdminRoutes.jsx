import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedAdminRoutes = ({ children }) => {
  const state = useSelector((state) => state.user);

  const location = useLocation();

  return state.role === 1000 ? (
    <Navigate
      to="/admin/dashboard"
      state={{ from: location.pathname }}
      replace
    />
  ) : (
    children
  );
};

ProtectedAdminRoutes.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedAdminRoutes;
