import AxiosInstance from "../../Axios/AxiosInstance";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../Redux/userSlice";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async () => {
    let toastId;
    try {
      // toastId = toast.loading("validating...");
      const res = await AxiosInstance.post(
        "/admin/login",
        {
          email: inputs.email,
          password: inputs.password,
        },
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      const data = res.data;
      return data;
    } catch (err) {
      toast.remove(toastId);
      toast.error(err.response.data.message || "An error occurred", {
        duration: 2000,
      });
      throw err; // Re-throw the error to be caught by the calling function
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await sendRequest();
      toast.success("Successfully Logged In");
      setTimeout(() => {
        dispatch(
          userLogin({
            role: Number(data.user.role),
            email: data.user.email,
            token: data.accessToken
          })
        );
        navigate("/admin/dashboard");
      }, 1500);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center px-3 pb-5 lg:pt-5">
        <div className="flex flex-col items-center p-2">
          <h1 className="font-semibold text-2xl sm:text-xl md:text-lg lg:text-2xl p-5 sm:px-6 md:px-8 lg:px-5">
            Log in to your SkillSail Admin Account
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
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                placeholder="Password"
                className="border h-10 border-black p-2"
              />
            </div>
            <div className="flex justify-center py-5 lg:mt-5 mb-10">
              <button
                type="submit"
                style={{ backgroundColor: "#004787" }}
                className="py-2 px-36 items-center text-white text-xl font-semibold"
              >
                SignIn
              </button>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default SignIn;
