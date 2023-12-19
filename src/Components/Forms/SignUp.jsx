import AxiosInstance from "../../Axios/AxiosInstance";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";

const SignUp = () => {
  const navigate = useNavigate();
  const [finalImage, setFinalImage] = useState(null);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const isValidFileUpload = (file) => {
    const validExtensions = ["png", "jpeg", "jpg", "doc", "docx", "pdf"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return validExtensions.includes(fileExtension);
  };

  const handleImage = (e) => {
    if (isValidFileUpload(e.target.files[0])) {
      ImageToBase(e.target.files[0]);
    } else {
      toast.error("Invalid file Format");
      return;
    }
  };

  const ImageToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFinalImage(reader.result);
    };
    reader.onerror = (error) => {
      toast.error("Error reading file: ", error.message);
    };
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  const [viewPassword, setViewPassword] = useState(false);

  const passwordView = () => {
    setViewPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(inputs);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const namePattern = /^[a-zA-Z._ -]+$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/; //condition: 1UC 1LC 1digit and strength 8
    const phonePattern = /^\d{10}$/;

    if (
      inputs.name === "" ||
      inputs.email === "" ||
      inputs.phone === "" ||
      inputs.password === "" ||
      inputs.confirmPassword === ""
    ) {
      toast.error("Please enter the required fields");
      return;
    }
    
    if (inputs.name.trim() === "" || !namePattern.test(inputs.name)) {
      // showErrorToast("Enter a Valid Name");
      toast.error("Enter a valid name", {
        duration: 1500,
      });
      return;
    }
    if (inputs.email.trim() === "" || !emailPattern.test(inputs.email)) {
      // showErrorToast("Enter Valid Email");
      toast.error("Enter a valid email", {
        duration: 1500,
      });
      return;
    }
    if (inputs.phone.trim() === "" || !phonePattern.test(inputs.phone)) {
      // showErrorToast("Enter a Valid Name");
      toast.error("Enter a valid phone number", {
        duration: 1500,
      });
      return;
    }
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
    if (inputs.password !== inputs.confirmPassword) {
      // showErrorToast("Passwords do not match");
      toast.error("Password do not match", {
        duration: 1500,
      });
      return;
    }
    const userData = {
      name: inputs.name,
      email: inputs.email,
      phone: inputs.phone,
      password: inputs.password,
      role: isChecked ? 3000 : 2000,
      isAccess: isChecked ? false : true,
      verifyDocument: finalImage,
    };
    let toastId = toast.loading("Loading...");
    if (viewPassword === true) {
      passwordView();
    }
    await AxiosInstance.post("/signup", userData)
      .then((response) => {
        if (response) {
          console.log();
          toast.remove(toastId);
          toast.success("Registration Successful", {
            duration: 1500,
          });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        } else {
          // showErrorToast("Cannot Register User");
          toast.error("Cannot register User", {
            duration: 1500,
          });
        }
      })
      .catch((error) => {
        // showErrorToast(error.message || "An error occurred");
        toast.error("An error occured" || error.message, {
          duration: 1500,
        });
      });
  };

  return (
    <>
      <div className="flex flex-col items-center">
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
                <label className="pb-3 font-semibold">Your Phone: </label>
                <input
                  value={inputs.phone}
                  onChange={handleChange}
                  name="phone"
                  type="text"
                  placeholder="Your Phone"
                  className="border h-10 border-black p-2"
                />
              </div>
              <div className="flex flex-col p-3 w-96 max-w-md">
                <label className="pb-3 font-semibold">Password: </label>
                <input
                  value={inputs.password}
                  onChange={handleChange}
                  name="password"
                  type={!viewPassword ? `password` : `text`}
                  placeholder="Password"
                  className="border h-10 border-black p-2"
                />
                {!viewPassword ? (
                  <div
                    className="absolute left-1/2 mx-36 px-3 flex my-12 cursor-pointer"
                    onClick={passwordView}
                  >
                    <IoIosEyeOff />
                  </div>
                ) : (
                  <div
                    className="absolute left-1/2 mx-36 px-3 flex my-12 cursor-pointer"
                    onClick={passwordView}
                  >
                    <IoIosEye />
                  </div>
                )}
                {inputs.password.length > 0 && (
                  <p className="text-sm text-gray-500 mt-2 text-justify">
                    Password must be at least 8 characters long and contain at
                    least one uppercase letter, one lowercase letter, and one
                    digit.
                  </p>
                )}
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
              <div className="mt-3 px-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value={isChecked}
                    className="sr-only peer"
                    onChange={handleToggle}
                  />
                  <div
                    className={`w-11 h-6 bg-gray-200 ${
                      isChecked
                        ? "peer-checked:bg-blue-600"
                        : "dark:bg-gray-700"
                    } peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}
                  ></div>
                  <span className="ms-3 text-base font-medium text-gray-900">
                    Signup as a Teacher
                  </span>
                </label>
              </div>
              <div className={`col-span-2 mt-3 ${!isChecked ? "hidden" : ""}`}>
                <label
                  htmlFor="formFileLg"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Attach verifying Document
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 relative m-0 block w-96 max-w-md flex-auto cursor-pointer border-solid bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-400 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-300 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                  id="formFileLg"
                  type="file"
                  accept=".png, .jpeg, .jpg, .doc, .docx, .pdf"
                  onChange={handleImage}
                />
              </div>
              <button
                type="submit"
                className="mx-auto mt-6 block bg-blue-800 hover:bg-blue-700 text-white font-semibold py-3 px-16"
              >
                Sign Up
              </button>
            </form>
          </div>
          <Toaster />
        </div>
      </div>
    </>
  );
};

export default SignUp;
