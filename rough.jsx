import { useState } from "react"; // Import React and useState

import Footer from "./src/Components/Navbar/Footer";
import UserNavbar from "./src/Components/Navbar/UserNavbar";

const Rough = () => {
  // State variable for the theme (true for dark, false for light)
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  // Define the theme class based on the state
  const themeClass = isDarkTheme ? "dark" : "light";

  // Define a class for text elements based on the theme
  const textClass = isDarkTheme ? "text-white" : "text-black";

  // Define a class for the background color based on the theme
  const bgClass = isDarkTheme ? "bg-gray-900" : "bg-white";

  return (
    <>
      <div className={`theme-${themeClass} ${bgClass}`}> {/* Apply theme and background class to the entire page */}
        <UserNavbar />
        <div className="flex flex-col justify-center items-center px-3 pb-5">
          <div className="flex h-screen flex-col justify-center items-center p-2">
            <button
              onClick={toggleTheme} // Button to toggle the theme
              className={`p-2 text-black ${isDarkTheme ? 'bg-white' : 'bg-gray-800'} rounded-md absolute top-4 right-4`}
            >
              Toggle Theme
            </button>
            <h1 className={`font-semibold text-2xl sm:text-xl md:text-lg lg:text-2xl p-5 sm:px-6 md:px-8 lg:px-5 ${textClass}`}>
              Signup and start Learning
            </h1>
            <form action="" method="post">
              <div className={`flex flex-col p-3 w-96 max-w-md ${textClass}`}>
                <label htmlFor="" className="pb-2 font-semibold">
                  Your Name:
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border h-10 border-black p-2"
                />
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Rough;
