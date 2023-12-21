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
          dispatch(
            userLogin({
              id,
              name,
              email,
              phone,
              role,
            })
          );
          navigate("/tutor/dashboard");
        } else if (res.status === 401) {
          console.log("sid", res);
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
            <div className="px-2 lg:pt-5">
              <h1 className="font-semibold">
                New to SkillSail ?{" "}
                <span
                  className="text-orange-400 font-bold"
                  onClick={() => navigate("/signup")}
                >
                  SignUp
                </span>
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
          {/* <div className="flex justify-center py-2">
            <button
              type="submit"
              style={{ backgroundColor: "#004787" }}
              className="py-2 px-8 items-center text-white text-xl font-semibold"
            >
              Continue with Google Account
            </button>
          </div> */}
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default SignIn;
