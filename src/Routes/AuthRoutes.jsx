import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import UserSignin from "../Pages/Signin/UserSignin";
import UserSignup from "../Pages/Signup/UserSignup";
import Home from "../Pages/Home/Home";

const AuthRoutes = () => {
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <>
      <Routes>
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/login" element={<UserSignin />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<UserSignin />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
