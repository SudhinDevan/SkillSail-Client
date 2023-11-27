import AxiosInstance from "../../Axios/AxiosInstance";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userLogin } from "../../Redux/userSlice";
import toast, { Toaster } from "react-hot-toast";

const SignIn = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

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
    const res = await AxiosInstance.post("/login", {
      email: inputs.email,
      password: inputs.password,
    }).catch((err) => console.log(err.message));

    const data = await res.data;
    return { ...data, status: res.status };
  };

  let toastId;

  const handleSubmit = (e) => {
    e.preventDefault();
    toastId = toast.loading("Loading...");
    sendRequest()
      .then((res) => {
        if (res.status === 201) {
          toast.remove(toastId);
          navigate("/verifyOtp", { state: res.user });
        } else if (res.status === 200 && res.user.role === 2000) {
          console.log("hello1");
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
          console.log("why1");
          navigate("/");
        } else if (res.status === 200 && res.user.role === 3000) {
          console.log("hello2");
          toast.remove(toastId);
          const { id, name, email, phone, role } = res.user;
          console.log(name);
          dispatch(
            userLogin({
              id,
              name,
              email,
              phone,
              role,
            })
          );
          console.log("why2");
          navigate("/tutor/dashboard");
          console.log("why3");
        }
      })
      .catch(() => {
        toast.remove(toastId);
        toast.error("Invalid Credentials");
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
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                placeholder="Password"
                className="border h-10 border-black p-2"
              />
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
