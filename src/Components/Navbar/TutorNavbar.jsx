import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useSelector } from "react-redux";
import Logo from "../HelperComponents/Logo";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useLogout from "../../Hooks/UseLogout";
import { useLocation } from "react-router-dom";

const TutorNavbar = () => {
  const location = useLocation();
  const logout = useLogout();
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const state = useSelector((state) => state.user);

  const updateToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = async () => {
    try {
      let toastId = toast.loading("Loggin Out");
      setTimeout(() => {
        toast.remove(toastId);
        logout();
      }, 1000);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {state.role === 3000 ? (
        <>
          <header className="sticky top-0 z-20 mx-auto flex w-full items-center justify-between bg-white border-b border-gray-200 p-5">
            <div
              className="cursor-pointer"
              onClick={() => navigate("/tutor/dashboard")}
            >
              <Logo />
            </div>
            <div className="hidden md:flex justify-content-between">
              <ul className="flex gap-20 font-semibold">
                <span
                  onClick={() => navigate("/tutor/dashboard")}
                  className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                    location.pathname === "/tutor/dashboard"
                      ? "text-orange-400"
                      : ""
                  }`}
                >
                  HOME
                </span>
                <span
                  className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                    location.pathname === "/tutor/runningCourse"
                      ? "text-orange-400"
                      : ""
                  }`}
                  onClick={() => navigate("/tutor/runningCourse")}
                >
                  MY COURSES
                </span>
                <span
                  className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                    location.pathname === "/tutor/publicCourses"
                      ? "text-orange-400"
                      : ""
                  }`}
                  onClick={() => navigate("/tutor/publicCourses")}
                >
                  COURSES
                </span>
                <span
                  className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                    location.pathname === "/tutor/students"
                      ? "text-orange-400"
                      : ""
                  }`}
                  onClick={() => navigate("/tutor/students")}
                >
                  STUDENTS
                </span>
                <span
                  className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                    location.pathname === "/tutor/chat" ? "text-orange-400" : ""
                  }`}
                  onClick={() => navigate("/tutor/chat")}
                >
                  CHATS
                </span>
                <span
                  className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                    location.pathname === "/tutor/blog" ? "text-orange-400" : ""
                  }`}
                  onClick={() => navigate("/tutor/blog")}
                >
                  BLOGS
                </span>
                <span
                  className={`cursor-pointer hover:text-orange-400 transition-all duration-300 ${
                    location.pathname === "/tutor/profile"
                      ? "text-orange-400"
                      : ""
                  }`}
                  onClick={() => navigate("/tutor/profile")}
                >
                  PROFILE
                </span>
              </ul>
            </div>
            <div className="hidden md:flex gap-4">
              <span
                className="bg-black text-white p-2 cursor-pointer  hover:bg-white hover:text-black border border-black"
                onClick={handleLogout}
              >
                LOGOUT
              </span>
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
            <div className="absolute w-full z-50">
              <ul className="p-3 font-semibold bg-white bg-opacity-90 flex flex-col items-end">
                <li className="p-3">HOME</li>
                <li className="p-3">MY COURSES</li>
                <li className="p-3">COURSES</li>
                <li className="p-3">CHATS</li>
                <li className="p-3">BLOGS</li>
                <li className="p-3">
                  PROFILE
                </li>
                <li className="p-3">
                  LOGOUT
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <>
          <header className="sticky top-0 z-20 mx-auto flex w-full items-center justify-between bg-white border-b border-gray-200 p-5">
            <Logo />
            <div className="hidden md:flex justify-content-between">
              <ul className="flex gap-20 font-semibold">
                <li>HOME</li>
                <li>COURSE</li>
                <li>MY LEARNING</li>
                <li>BLOG</li>
                <li>PROFILE</li>
              </ul>
            </div>
            <div className="hidden md:flex gap-4"></div>
            <div className="flex md:hidden" onClick={updateToggle}>
              {toggle ? (
                <MdMenu style={{ fontSize: "2rem" }} />
              ) : (
                <MdMenu style={{ fontSize: "2rem" }} />
              )}
            </div>
          </header>
          {!toggle && (
            <div className="">
              <ul className="p-3 font-semibold flex flex-col items-end">
                <li className="p-3">HOME</li>
                <li className="p-3">COURSE</li>
                <li className="p-3">MY LEARNING</li>
                <li className="p-3">BLOG</li>
                <li className="p-3" onClick={() => navigate("/tutor/profile")}>
                  PROFILE
                </li>
                <li className="p-3" onClick={() => navigate("/user/login")}>
                  LOGOUT
                </li>
              </ul>
            </div>
          )}
        </>
      )}
      <Toaster />
    </>
  );
};

export default TutorNavbar;
