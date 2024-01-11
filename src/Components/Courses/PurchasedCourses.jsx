import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";

const PurchasedCourses = () => {
  const navigate = useNavigate();
  const axiosInstance = UseAxiosPrivate();
  const { id } = useSelector((state) => state.user);
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("/user/myCourses", { id });
        setCourses(response.data.appliedCoursesDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {courses ? (
        <div className="p-6">
          <span className="text-3xl font-bold text-blue-900">
            My Learnings:{" "}
          </span>
          <div className="container mx-auto p-3 border-gray-200 overflow-x-auto">
            <div className="flex flex-col">
              {courses.length > 0 ? (
                courses.map((course) => (
                  <div
                    key={course._id}
                    onClick={() => navigate(`/user/courses/${course._id}`)}
                    className="p-4 h-44 border-2 mr-10 mt-4 mb-3 w-full rounded shadow-md cursor-pointer flex bg-white hover:bg-gray-100"
                  >
                    <img
                      src={course.thumbnail.url}
                      alt="plus"
                      className="w-52 h-32 opacity-80 hover:opacity-100"
                    />
                    <h1 className="text-xl ml-40 font-bold text-gray-700 hover:text-gray-800 p-2">
                      Course Name: {course.courseName}
                    </h1>
                  </div>
                ))
              ) : (
                <div className="p-4 h-24 border-2 mr-10 mt-4 mb-3 w-full rounded shadow-md cursor-pointer flex justify-center bg-white hover:bg-gray-100">
                  <h1 className="text-xl font-bold text-gray-700 p-2">
                    No courses available.
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <SyncLoader
            color="#004787" // Dark blue color
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
};

export default PurchasedCourses;
