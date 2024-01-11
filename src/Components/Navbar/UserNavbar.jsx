import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { userLogout } from "../../Redux/userSlice";
import toast, { Toaster } from "react-hot-toast";
// import AxiosInstance from "../../Hooks/UseAxiosPrivate";
import Logo from "../HelperComponents/Logo";
import useLogout from "../../Hooks/UseLogout";
// AxiosInstance.defaults.withCredentials = true;
import { useLocation } from "react-router-dom";

const UserNavbar = () => {
  const location = useLocation();
  const logout = useLogout();
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const axios = AxiosInstance();
  const [toggle, setToggle] = useState(true);

  const updateToggle = () => {
    setToggle(!toggle);
  };

  const { id, role } = useSelector((state) => state.user);

  const handleLogout = async () => {
    try {
      logout();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-20 mx-auto flex w-full items-center justify-between bg-white border-b border-gray-200 p-5">
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          <Logo />
        </div>
        <div className="hidden md:flex justify-content-between">
          <ul className="flex gap-20 font-semibold">
            <span
              className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                location.pathname === "/" ? "text-orange-400" : ""
              }`}
              onClick={() => navigate("/")}
            >
              HOME
            </span>
            <span
              onClick={() => navigate("/user/courses")}
              className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                location.pathname === "/user/courses" ? "text-orange-400" : ""
              }`}
            >
              ALL COURSES
            </span>
            <span
              onClick={() => navigate("/user/myLearning")}
              className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                location.pathname === "/user/myLearning"
                  ? "text-orange-400"
                  : ""
              }`}
            >
              MY LEARNING
            </span>
            <span
              className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                location.pathname === "/user/blog" ? "text-orange-400" : ""
              }`}
              onClick={() => navigate("/user/blog")}
            >
              BLOG
            </span>
            <span
              className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                location.pathname === "/user/chat" ? "text-orange-400" : ""
              }`}
              onClick={() => navigate("/user/chat")}
            >
              CHATS
            </span>
            <span
              className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                location.pathname === "/user/profile" ? "text-orange-400" : ""
              }`}
              onClick={() => navigate("/user/profile")}
            >
              PROFILE
            </span>
            <span
              className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                location.pathname === "/user/transactions"
                  ? "text-orange-400"
                  : ""
              }`}
              onClick={() => navigate("/user/transactions")}
            >
              TRANSACTIONS
            </span>
          </ul>
        </div>
        <div className="hidden md:flex gap-4">
          {!id ? (
            <>
              <button
                className="border-black border p-2 cursor-pointer hover:bg-black hover:text-white"
                onClick={() => navigate("/user/login")}
              >
                LOGIN
              </button>
              <button
                className="p-2 border border-black cursor-pointer hover:bg-black hover:text-white"
                onClick={() => navigate("/user/signup")}
              >
                SIGNUP
              </button>
            </>
          ) : (
            <span
              className="bg-black text-white p-2 cursor-pointer  hover:bg-white hover:text-black border border-"
              onClick={handleLogout}
            >
              LOGOUT
            </span>
          )}
        </div>
        <div className="flex md:hidden" onClick={updateToggle}>
          {toggle ? (
            <MdMenu style={{ fontSize: "2rem" }} />
          ) : (
            <MdMenu style={{ fontSize: "2rem" }} />
          )}
        </div>
      </header>
      {!toggle && (
        <div className="absolute w-full z-10">
          <ul className="p-3 font-semibold flex flex-col items-end bg-white bg-opacity-95 text-black">
            <li className="p-3">HOME</li>
            <li className="p-3">ALL COURSES</li>
            <li className="p-3">MY LEARNING</li>
            <li className="p-3">BLOG</li>
            <li className="p-3" onClick={() => navigate("/user/profile")}>
              PROFILE
            </li>
            {!role === 2000 ? (
              <>
                <li className="p-3" onClick={() => navigate("/user/login")}>
                  LOGIN
                </li>
                <li className="p-3" onClick={() => navigate("/user/signup")}>
                  SIGNUP
                </li>
              </>
            ) : (
              <li className="p-3" onClick={() => navigate("/user/login")}>
                LOGOUT
              </li>
            )}
          </ul>
        </div>
      )}
      <Toaster />
    </>
  );
};

export default UserNavbar;
