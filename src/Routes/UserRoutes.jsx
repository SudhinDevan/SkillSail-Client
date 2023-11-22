import { Route, Routes } from "react-router-dom";
import UserSignin from "../Pages/Signin/UserSignin";
import UserSignup from "../Pages/Signup/UserSignup";
import Home from "../Pages/Home/Home";
import ProtectedAuthRoutes from "../Utils/ProtectedUserAuthRoutes";
import OtpVerify from "../Pages/Otp/OtpVerify";
import UserProfile from "../Pages/Profile/UserProfile";
import ProtectedUserRoutes from "../Utils/ProtectedUserRoutes";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedAuthRoutes>
              <UserSignin />
            </ProtectedAuthRoutes>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedAuthRoutes>
              <UserSignup />
            </ProtectedAuthRoutes>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/verifyOtp" element={<OtpVerify />} />

        <Route
          path="/profile"
          element={
            <ProtectedUserRoutes>
              <UserProfile />
            </ProtectedUserRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default AuthRoutes;
