import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../Store/Index";
import axios from "axios";
import Logo from "../Logo";
axios.defaults.withCredentials = true;

const UserNavbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(true);

  const updateToggle = () => {
    setToggle(!toggle);
  };

  const sendLogoutRequest = async () => {
    try {
      const res = await axios.post("http://localhost:3000/logout", null, {
        withCredentials: true,
      });
      if (res.status == 200) {
        return res;
      } else {
        throw new Error("Unable to Logout");
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const handleLogout = () => {
    sendLogoutRequest().then(() => dispatch(authActions.logout()));
  };

  return (
    <>
      <header className="sticky top-0 z-20 mx-auto flex w-full items-center justify-between bg-white border-b border-gray-200 p-5">
        <Logo />
        <div className="hidden md:flex justify-content-between">
          <ul className="flex gap-20 font-semibold">
            <li>HOME</li>
            <li>COURSE</li>
            <li>MY LEARNING</li>
            <li>BLOG</li>
          </ul>
        </div>
        <div className="hidden md:flex gap-4">
          {!isLoggedIn && (
            <>
              <span
                className="border-black border p-2"
                onClick={() => navigate("/login")}
              >
                LOGIN
              </span>
              <span
                className="bg-black text-white p-2"
                onClick={() => navigate("/signup")}
              >
                SIGNUP
              </span>
            </>
          )}

          {isLoggedIn && (
            <span className="bg-black text-white p-2" onClick={handleLogout}>
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
        <div className="">
          <ul className="p-3 font-semibold flex flex-col items-end">
            <li className="p-3">HOME</li>
            <li className="p-3">COURSE</li>
            <li className="p-3">MY LEARNING</li>
            <li className="p-3">BLOG</li>
            {!isLoggedIn && (
              <>
                <li className="p-3" onClick={() => navigate("/login")}>
                  LOGIN
                </li>
                <li className="p-3" onClick={() => navigate("/signup")}>
                  SIGNUP
                </li>
              </>
            )}
            {isLoggedIn && (
              <li className="p-3" onClick={() => navigate("/login")}>
                LOGOUT
              </li>
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default UserNavbar;
