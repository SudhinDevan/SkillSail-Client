import Footer from "../Navbar/Footer";
import UserNavbar from "../Navbar/UserNavbar";

const UserSignup = () => {
  return (
    <>
      <UserNavbar />
      <div className="flex flex-col items-center p-3 pb-5">
        <div className="flex flex-col items-center pb-5">
          <h1 className="font-semibold text-2xl sm:text-xl md:text-lg lg:text-2xl p-5 sm:px-6 md:px-8 lg:px-5">
            Signup and start Learning
          </h1>
          <form action="" method="post">
            <div className="flex flex-col p-3 w-96 max-w-md">
              <label htmlFor="" className="pb-2 font-semibold">
                Your Name:
              </label>
              <input
                type="text"
                placeholder="Your Name"
                className="border h-10 border-black p-2"
              />
            </div>
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
            <div className="flex flex-col p-3 w-96 max-w-md">
              <label htmlFor="" className="pb-3 font-semibold">
                Confirm Password:{" "}
              </label>
              <input
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
      </div>
      <Footer />
    </>
  );
};

export default UserSignup;
