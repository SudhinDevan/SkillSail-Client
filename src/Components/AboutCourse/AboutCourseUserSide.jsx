import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";

const AboutCourseUserSide = ({ courseId }) => {
  const [courses, setCourses] = useState(null);
  const [chapters, setChapters] = useState([]);

  const AxiosInstance = UseAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get("/courseDetails", {
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
          <div className="w-1/3 border-2 border-gray-300 shadow-md cursor-pointer transition-all duration-500 hover:-translate-y-3 p-3 mx-6 mt-5 h-24 flex flex-col justify-center text-center">
            <button className="text-2xl font-semibold text-gray-500">
              BUY THIS COURSE
            </button>
            <span className="font-semibold text-gray-500">
              Only &#8377;{courses.price}
            </span>
          </div>
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
