import { Link } from "react-router-dom";

const SignIn = () => {
  return (
    <>
      <div className="flex flex-col items-center px-3 pb-5">
        <div className="flex flex-col items-center p-2">
          <h1 className="font-semibold text-2xl sm:text-xl md:text-lg lg:text-2xl p-5 sm:px-6 md:px-8 lg:px-5">
            Log in to your SkillSail Account
          </h1>
          <form action="" method="post">
            <div className="flex flex-col p-3 w-96 max-w-md">
              <label htmlFor="" className="pb-3 font-semibold">
                Your Email:{" "}
              </label>
              <input
                type="text"
                placeholder="Your Email"
                className="border h-10 border-black p-2"
              />
            </div>
            <div className="flex flex-col p-3 w-96 max-w-md">
              <label htmlFor="" className="pb-3 font-semibold">
                Password:{" "}
              </label>
              <input
                type="password"
                placeholder="Password"
                className="border h-10 border-black p-2"
              />
            </div>
            <div className="px-2">
              <h1 className="font-semibold">
                New to SkillSail ?{" "}
                <Link to="/signup">
                  <span className="text-orange-400 font-bold">SignUp</span>
                </Link>
              </h1>
            </div>
            <div className="flex justify-center py-5">
              <button
                type="submit"
                style={{ backgroundColor: "#004787" }}
                className="py-2 px-36 items-center text-white text-xl font-semibold"
              >
                SignIn
              </button>
            </div>
          </form>
          <div className="flex justify-center py-2">
            <button
              type="submit"
              style={{ backgroundColor: "#004787" }}
              className="py-2 px-8 items-center text-white text-xl font-semibold"
            >
              Continue with Google Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
