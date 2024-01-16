import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../Pages/Otp/ForgotPassword";
import ChangePassword from "../Pages/Profile/ChangePassword";
import ProtectedAuthRoutes from "../Utils/ProtectedUserAuthRoutes";
import OtpVerify from "../Pages/Otp/OtpVerify";

const PublicRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/changePassword" element={<ChangePassword />} />
        <Route
          path="/verifyOtp"
          element={
            <ProtectedAuthRoutes>
              <OtpVerify />
            </ProtectedAuthRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default PublicRoutes;
