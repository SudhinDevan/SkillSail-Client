import { Route, Routes } from "react-router-dom";
import UserSignin from "../Pages/Signin/UserSignin";
import UserSignup from "../Pages/Signup/UserSignup";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<UserSignin />} />
        <Route path="/signup" element={<UserSignup />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
