import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { useNavigate } from "react-router-dom";

const DisplayCoursesUserSide = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const axiosInstance = UseAxiosPrivate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/courses");
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="p-6">
        <span className="text-3xl font-bold text-blue-900">
          Available Courses:{" "}
        </span>
        <div className="container mx-auto p-3 border-gray-200 overflow-x-auto">
          <div className="flex flex-wrap">
            {courses?.map((course) => (
              <div
                key={course._id}
                onClick={() => navigate(`/courses/${course._id}`)}
                className="p-4 h-60 border-2 mr-10 mt-4 mb-3 w-80 rounded shadow-md cursor-pointer flex flex-col items-center justify-center bg-white hover:bg-gray-100"
              >
                <img
                  src={course.thumbnail.url}
                  alt="plus"
                  className="w-52 h-40 opacity-80 hover:opacity-100"
                />
                <h1 className="text-xl font-bold text-gray-700 text-center hover:text-gray-800 justify-center p-2">
                  {course.courseName}
                </h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayCoursesUserSide;
