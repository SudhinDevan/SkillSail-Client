import { useState } from "react";
import Logo from "../Logo";
import { MdMenu } from "react-icons/md";

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
          <span className="border-black border p-2">LOGIN</span>
          <span className="bg-black text-white p-2">SIGNUP</span>
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
          </ul>
        </div>
      )}
    </>
  );
};

export default UserNavbar;
