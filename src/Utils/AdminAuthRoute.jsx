import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const AdminAuthRoute = ({ children }) => {
  const { isloggedIn } = useSelector((state) => state.admin);
  const location = useLocation();

  return !isloggedIn ? (
    <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
  ) : (
    children
  );
};

AdminAuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminAuthRoute;
