import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AxiosInstance from "../../Axios/AxiosInstance";
import { Toaster } from "react-hot-toast";

const AboutCourse = ({ courseId }) => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/tutor/courseDetails", {
          params: { courseId },
        });

        setCourseDetails(response.data.courseData);
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <>
      {courseDetails && (
        <div className="p-3">
          <div>
            <span className="text-2xl font-bold">Course Details:</span>
          </div>
          <div className="flex flex-col ml-3 p-5">
            <img
              src={courseDetails?.thumbnail?.url}
              alt="thumbnail"
              className=" w-1/4"
            />
          </div>
          <div className="p-3 mx-5 w-1/2">
            <span className="text-xl">
              <span className="font-bold">Course Blurb:{` `}</span>
              {courseDetails.blurb}
            </span>
          </div>

          <div className="p-3 mx-5 w-1/2">
            <span className="font-bold text-lg">Description:{` `} </span>
            <div className="text-justify">
              <span className="text-lg">{courseDetails.description}</span>
            </div>
          </div>
          {/* //////////////////////////// */}
          <div className="relative">
            <button
              id="dropdownDefaultButton"
              onClick={toggleDropdown}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              Dropdown button
              <svg
                className={`w-2.5 h-2.5 ms-3 transform transition-transform ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2">
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Dashboard
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Settings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Earnings
                    </a>
                  </li>
                  <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
          {/* ///////////////// */}
          <Toaster />
        </div>
      )}
    </>
  );
};

AboutCourse.propTypes = {
  courseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AboutCourse;
