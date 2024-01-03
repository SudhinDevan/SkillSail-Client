import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { useSelector } from "react-redux";

const PublicCourseTutor = () => {
  const axiosPrivate = UseAxiosPrivate();
  const navigate = useNavigate();
  const [courses, setCourses] = useState(null);
  const { email } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosPrivate.get("/tutor/publicCourseList", {
          params: { email },
        });
        setCourses(response.data.coursesList || []);
      } catch (error) {
        console.error("Error fetching course list:", error);
      }
    };
    fetchCourses();
  }, []);

  return (
    <>
      {courses ? (
        courses.length > 0 ? (
          <div className="p-6">
            <span className="text-3xl font-bold">Classes: </span>
            <div className="container mx-auto p-3 border-gray-200 overflow-x-auto">
              <div className="flex flex-wrap">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    onClick={() =>
                      navigate(`/tutor/courseDetails/${course._id}`)
                    }
                    className="p-4 h-60 border-2 mr-10 mt-4 mb-3 w-80 rounded shadow-md flex flex-col items-center justify-center bg-white hover:bg-gray-100"
                  >
                    <img
                      src={course.thumbnail.url}
                      alt="Thumbnail Image"
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
        ) : (
          <div className="p-3">
            <div className="p-4 h-24 border-2 mr-10 mt-4 mb-3 w-full rounded shadow-md cursor-pointer flex justify-center bg-white hover:bg-gray-100">
              <h1 className="text-xl font-bold text-gray-700 p-2">
                No Public Courses available.
              </h1>
            </div>
          </div>
        )
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

export default PublicCourseTutor;
