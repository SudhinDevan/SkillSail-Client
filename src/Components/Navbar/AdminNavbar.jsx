import { useNavigate } from "react-router-dom";
import { MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../Logo";
import { useState } from "react";
import axios from "axios";
import { adminLogout } from "../../Redux/adminSlice";

const AdminNavbar = () => {
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isloggedIn } = useSelector((state) => state.admin);

  const updateToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:3000/admin/logout");
      if (res.status === 200) {
        dispatch(adminLogout());
        navigate("/admin/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {isloggedIn ? (
        <>
          <header className="sticky top-0 z-20 mx-auto flex w-full items-center justify-between bg-white border-b border-gray-200 p-5">
            <div onClick={() => navigate("/admin/dashboard")}>
              <Logo />
            </div>
            <div className="hidden md:flex justify-content-between">
              <ul className="flex gap-20 font-semibold">
                <span
                  className="cursor-pointer hover:text-orange-400"
                  onClick={() => navigate("/admin/users")}
                >
                  STUDENTS
                </span>
                <span
                  className="cursor-pointer hover:text-orange-400"
                  onClick={() => navigate("/admin/teachers")}
                >
                  TEACHERS
                </span>
                <li>TEACHER REQUEST</li>
                <li>ALL COURSES</li>
                <li>TRANSACTIONS</li>
              </ul>
            </div>
            <div className="hidden md:flex gap-4">
              <span
                className="bg-black text-white p-2 cursor-pointer"
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
            <div className="">
              <ul className="p-3 font-semibold flex flex-col items-end">
                <li className="p-3">STUDENTS</li>
                <li className="p-3">TEACHERS</li>
                <li className="p-3">TEACHER REQUEST</li>
                <li className="p-3">ALL COURSES</li>
                <li className="p-3">TRANSACTIONS</li>
                <li className="p-3" onClick={() => navigate("/profile")}>
                  PROFILE
                </li>
                <li className="p-3" onClick={() => navigate("/login")}>
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
                <li className="p-3" onClick={() => navigate("/profile")}>
                  PROFILE
                </li>
                <li className="p-3" onClick={() => navigate("/login")}>
                  LOGOUT
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default AdminNavbar;