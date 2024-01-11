import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../Pages/Otp/ForgotPassword";
import ChangePassword from "../Pages/Profile/ChangePassword";

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
      </Routes>
    </>
  );
};

export default PublicRoutes;
