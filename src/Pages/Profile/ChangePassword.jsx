import { useState } from "react";
import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";
import Axios from "../../Axios/AxiosInstance";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;
  const [inputs, setInputs] = useState({
    password: "",
    confirmPassword: "",
    id,
  });

  const handlechange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const changePassword = async () => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; //condition: 1UC 1LC 1digit and strength 8
    if (
      inputs.password.trim() === "" ||
      !passwordPattern.test(inputs.password)
    ) {
      // showErrorToast("Password Must be atleast 6 digits");
      toast.error(
        "Password must be atleast 8 digits, Should contain an Uppercase Letter, a Lowercase Letter and a Number",
        {
          duration: 3000,
        }
      );
      return;
    }
    if (inputs.password != inputs.confirmPassword) {
      return toast.error("Passwords does not match");
    }
    await Axios.post("/changePassword", inputs);
    toast.success("Password Changed Successfully");
    setTimeout(() => {
      navigate("/");
    }, 2500);
  };

  return (
    <>
      <UserNavbar />
      <div className="flex mt-10 p-3 flex-col items-center mb-16">
        <div className="p-2 pb-5">
          <h1 className="text-xl font-bold text-gray-700">
            Enter New Password:{" "}
          </h1>
        </div>
        <div className="w-1/3">
          <div className="relative w-full min-w-[200px] h-14">
            <input
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-400 focus:border-gray-900"
              placeholder=" "
              name="password"
              onChange={handlechange}
              type="password"
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              Enter New Password
            </label>
          </div>
        </div>
        <div className="w-1/3 pt-10">
          <div className="relative w-full min-w-[200px] h-14">
            <input
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-400 focus:border-gray-900"
              name="confirmPassword"
              placeholder=" "
              type="password"
              onChange={handlechange}
            />

            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              Confirm Password
            </label>
          </div>
        </div>
        <button
          onClick={changePassword}
          className="bg-white hover:bg-gray-100 mt-5 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          Submit
        </button>
        {inputs.password.length > 0 && (
          <p className="text-sm text-red-500 mt-2">
            Password must be at least 8 characters long and contain at least one
            uppercase letter, one lowercase letter, and one digit.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ChangePassword;
