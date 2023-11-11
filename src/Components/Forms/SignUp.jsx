import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  showErrorToast,
  showToast,
  ToastContainer,
} from "../../Helpers/Toasters";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const namePattern = /^[a-zA-Z._-]+$/;
    const passwordPattern = /^\d{6}$/;
    if (inputs.name.trim() === "" || !namePattern.test(inputs.name)) {
      showErrorToast("Enter a Valid Name");
      return;
    }
    if (inputs.email.trim() === "" || !emailPattern.test(inputs.email)) {
      showErrorToast("Enter Valid Email");
      return;
    }
    if (
      inputs.password.trim() === "" ||
      !passwordPattern.test(inputs.password)
    ) {
      showErrorToast("Password Must be atleast 6 digits");
      return;
    }
    if (inputs.password !== inputs.confirmPassword) {
      showErrorToast("Passwords do not match");
      return;
    }
    const userData = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    };
    await axios
      .post("http://localhost:3000/signup", userData)
      .then((response) => {
        if (response) {
          console.log();
          showToast("Registration successful");
          navigate("/login");
        } else {
          showErrorToast("Cannot Register User");
        }
      })
      .catch((error) => {
        showErrorToast(error.message || "An error occurred");
      });
  };

  return (
    <>
      <div className="flex flex-col items-center p-3 pb-5">
        <div className="flex flex-col items-center pb-5">
          <h1 className="font-semibold text-2xl sm:text-xl md:text-lg lg:text-2xl p-5 sm:px-6 md:px-8 lg:px-5">
            Signup and start Learning
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col p-3 w-96 max-w-md">
              <label className="pb-2 font-semibold">Your Name:</label>
              <input
                value={inputs.name}
                onChange={handleChange}
                name="name"
                type="text"
                placeholder="Your Name"
                className="border h-10 border-black p-2"
              />
            </div>
            <div className="flex flex-col p-3 w-96 max-w-md">
              <label className="pb-3 font-semibold">Your Email: </label>
              <input
                value={inputs.email}
                onChange={handleChange}
                name="email"
                type="text"
                placeholder="Your Email"
                className="border h-10 border-black p-2"
              />
            </div>
            <div className="flex flex-col p-3 w-96 max-w-md">
              <label className="pb-3 font-semibold">Password: </label>
              <input
                value={inputs.password}
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
                className="border h-10 border-black p-2"
              />
            </div>
            <div className="flex flex-col p-3 w-96 max-w-md">
              <label className="pb-3 font-semibold">Confirm Password: </label>
              <input
                value={inputs.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="border h-10 border-black p-2"
              />
            </div>
            <button
              type="submit"
              style={{ backgroundColor: "#004787" }}
              className="mx-auto mt-6 block text-white font-semibold py-3 px-16"
            >
              Sign Up
            </button>{" "}
          </form>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default SignUp;
