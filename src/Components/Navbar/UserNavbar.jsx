import { useState } from "react";
import Logo from "../Logo";
import { MdMenu } from "react-icons/md";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  const [toggle, setToggle] = useState(true);

  const updateToggle = () => {
    setToggle(!toggle);
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
          <Link to="/login">
            <span className="border-black border p-2">LOGIN</span>
          </Link>
          <Link to="/signup">
            <span className="bg-black text-white p-2">SIGNUP</span>
          </Link>
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
            <Link to="/login">
              <li className="p-3">LOGIN</li>
            </Link>
            <Link to="/signup">
              <li className="p-3">SIGNUP</li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};

export default UserNavbar;
