import Axios from "../../Axios/AxiosInstance";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../Redux/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { IoIosEyeOff } from "react-icons/io";
import { IoIosEye } from "react-icons/io";

const SignIn = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

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

  let toastId;

  const sendRequest = async () => {
    try {
      const res = await Axios.post(
        "/login",
        {
          email: inputs.email,
          password: inputs.password,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      const data = await res.data;
      return { ...data, status: res.status };
    } catch (err) {
      toast.remove(toastId);
      toastId = toast.error(err.response.data.message);
      setTimeout(() => {
        toast.remove(toastId);
        navigate("/login");
      }, 3000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (viewPassword === true) {
      passwordView();
    }
    toastId = toast.loading("Loading...");
    sendRequest()
      .then((res) => {
        if (res.status === 201) {
          toast.remove(toastId);
          navigate("/verifyOtp", { state: res.user });
        } else if (res.status === 200 && res.user.role === 2000) {
          toast.remove(toastId);
          const { id, name, email, phone, role } = res.user;
          const token = res.accessToken;
          dispatch(
            userLogin({
              id,
              name,
              email,
              phone,
              role,
              token,
            })
          );
          navigate("/");
        } else if (res.status === 200 && res.user.role === 3000) {
          toast.remove(toastId);
          const { id, name, email, phone, role } = res.user;
          const token = res.accessToken;
          dispatch(
            userLogin({
              id,
              name,
              email,
              phone,
              role,
              token,
            })
          );
          navigate("/tutor/dashboard");
        } else if (res.status === 401) {
          toast.remove(toastId);
          toast.error("Please wait till your profile is verified by the admin");
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleForgot = (e) => {
    setEmail((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const forgotPassword = async (e) => {
    e.preventDefault();
    try {
      let toastId = toast.loading("Loading...");
      const res = await Axios.post("/forgotPassword", email);
      toast.remove(toastId);
      navigate("/forgotPassword", { state: res.data.user });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center px-3 pb-5 lg:pt-5">
        <div className="flex flex-col items-center p-2">
          <h1 className="font-semibold text-2xl sm:text-xl md:text-lg lg:text-2xl p-5 sm:px-6 md:px-8 lg:px-5">
            Log in to your SkillSail Account
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col p-3 w-96 max-w-md lg:pt-5">
              <label htmlFor="" className="pb-3 font-semibold">
                Your Email:{" "}
              </label>
              <input
                name="email"
                value={inputs.email}
                onChange={handleChange}
                type="text"
                placeholder="Your Email"
                className="border h-10 border-black p-2"
              />
            </div>
            <div className="flex flex-col p-3 w-96 max-w-md lg:pt-5">
              <label htmlFor="" className="pb-3 font-semibold">
                Password:{" "}
              </label>
              <input
                type={!viewPassword ? `password` : `text`}
                name="password"
                value={inputs.password}
                onChange={handleChange}
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
            </div>
            <div className="px-2 lg:pt-5 flex justify-between">
              <h1 className="font-semibold">
                New to SkillSail ?{" "}
                <span
                  className="text-orange-400 font-bold cursor-pointer"
                  onClick={() => navigate("/signup")}
                >
                  SignUp
                </span>
              </h1>
              <h1
                onClick={toggleModal}
                className="font-semibold cursor-pointer hover:text-blue-800 transition-colors duration-300"
              >
                Forgot Password ?
              </h1>
            </div>
            <div className="flex justify-center py-5 lg:mt-5">
              <button
                type="submit"
                className="py-2 px-36 bg-blue-800 hover:bg-blue-700 items-center text-white text-xl font-semibold"
              >
                SignIn
              </button>
            </div>
          </form>
        </div>
        {isModalOpen && (
          <div
            aria-hidden="true"
            className="flex fixed bg-gray-300 bg-opacity-20 z-50 justify-center items-center w-full md:inset-0 max-h-full backdrop-filter backdrop-blur-sm"
          >
            <div className="relative  w-full  max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Forgot Password ?
                  </h3>

                  <button
                    onClick={toggleModal}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                    data-modal-toggle="crud-modal"
                  >
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4 md:p-5" onSubmit={forgotPassword}>
                  <div className="">
                    <div className="col-span-2">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-lg font-medium text-gray-900 justify-center text-center placeholder:text-center"
                      >
                        Enter Your Email Id
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleForgot}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        required=""
                        placeholder="Enter your email here"
                      />
                    </div>
                    <div className="flex pt-3 justify-center items-center">
                      <button
                        type="submit"
                        className="text-white bg-blue-400 hover:bg-blue-500 hover:text-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </>
  );
};

export default SignIn;
