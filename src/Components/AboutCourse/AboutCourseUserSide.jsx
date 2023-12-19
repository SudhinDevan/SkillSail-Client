import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import PaymentWithPaypal from "../Payment/PaymentModal";

const AboutCourseUserSide = ({ courseId }) => {
  const [courses, setCourses] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const AxiosInstance = UseAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get("/user/courseDetails", {
          params: { courseId },
        });
        console.log("course", res.data);
        setCourses(res.data.course);
        setChapters(res.data.chapter);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  const paymentModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  return (
    <>
      {courses && (
        <div className="p-3">
          <div className="flex justify-between">
            <span className="text-2xl font-bold">
              {courses.courseName}
              {` `}:
            </span>
            <div className="absolute top-32 right-3">
              {/* //////////////////// */}
              {chapters?.map((chapter) => (
                <div className="relative py-3" key={chapter._id}>
                  <button
                    id="dropdownDefaultButton"
                    className="text-gray-600 bg-gray-300 hover:text-gray-600 transition-colors duration-300 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-400 font-semibold rounded-lg text-xl w-96 overflow-hidden px-2 py-2.5 text-center inline-flex items-center justify-center"
                    type="button"
                  >
                    {chapter.chapterName}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col ml-3 p-5">
            <img
              src={courses.thumbnail.url}
              alt="thumbnail"
              className="w-1/4"
            />
          </div>
          <div className="p-3 mx-5 w-2/3">
            <span className="text-xl">
              <span className="font-bold">Course Blurb:{` `}</span>
              {courses.blurb}
            </span>
          </div>

          <div className="p-3 mx-5 w-2/3">
            <span className="font-bold text-lg">Description:{` `} </span>
            <div className="text-justify">{courses.description}</div>
          </div>
          <div
            onClick={paymentModal}
            className="w-1/3 border-2 border-gray-300 shadow-md cursor-pointer transition-all duration-500 hover:-translate-y-3 p-3 mx-6 mt-5 h-24 flex flex-col justify-center text-center"
          >
            <button className="text-2xl font-semibold text-gray-500">
              BUY THIS COURSE
            </button>
            <span className="font-semibold text-gray-500">
              Only &#8377;{courses.price}
            </span>
          </div>
          {isModalVisible && (
            <div
              aria-hidden="true"
              className="flex fixed bg-gray-300 bg-opacity-20 z-50 justify-center items-center w-full md:inset-0 max-h-full backdrop-filter backdrop-blur-sm"
            >
              <div className="relative w-full max-w-lg max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                  {/* ------------------------------------------------------- */}
                  <div className="flex flex-col p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {courses.courseName}
                    </h3>
                    <div className="flex items-center justify-between mt-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        ₹ {courses.price}
                      </h3>

                      <button
                        onClick={paymentModal}
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
                  </div>
                  <div className="p-5">
                    <PaymentWithPaypal />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

AboutCourseUserSide.propTypes = {
  courseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AboutCourseUserSide;
