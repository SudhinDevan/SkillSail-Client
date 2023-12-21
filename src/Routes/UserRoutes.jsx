import { Route, Routes } from "react-router-dom";
import UserSignin from "../Pages/Signin/UserSignin";
import UserSignup from "../Pages/Signup/UserSignup";
import Home from "../Pages/Home/Home";
import ProtectedAuthRoutes from "../Utils/ProtectedUserAuthRoutes";
import OtpVerify from "../Pages/Otp/OtpVerify";
import UserProfile from "../Pages/Profile/UserProfile";
import ProtectedUserRoutes from "../Utils/ProtectedUserRoutes";
import DisplayCourses from "../Pages/DisplayCourses/DisplayCourses";
import DisplayCourseDetails from "../Pages/CourseDetails/DisplayCourseDetails";
import MyLearning from "../Pages/MyLearning/MyLearning";

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
        <Route path="/" element={<Home />} exact />
        <Route
          path="/verifyOtp"
          element={
            <ProtectedAuthRoutes>
              <OtpVerify />
            </ProtectedAuthRoutes>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedUserRoutes>
              <UserProfile />
            </ProtectedUserRoutes>
          }
        />
        <Route
          path="/courses"
          element={
            <ProtectedUserRoutes>
              <DisplayCourses />
            </ProtectedUserRoutes>
          }
        />
        <Route
          path="/courses/:courseId"
          element={
            <ProtectedUserRoutes>
              <DisplayCourseDetails />
            </ProtectedUserRoutes>
          }
        />
        <Route
          path="/myLearning"
          element={
            <ProtectedUserRoutes>
              <MyLearning />
            </ProtectedUserRoutes>
          }
        />
      </Routes>
    </>
  );
};

export default AuthRoutes;
