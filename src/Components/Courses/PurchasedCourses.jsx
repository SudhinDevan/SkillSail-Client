import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { useSelector } from "react-redux";

const PurchasedCourses = () => {
  const axiosInstance = UseAxiosPrivate();
  const { id } = useSelector((state) => state.user);
  const [courses, setCourses] = useState([]);

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

  console.log(courses);
  return (
    <>
      <div className="p-6">
        <span className="text-3xl font-bold text-blue-900">My Learnings: </span>
        <div className="container mx-auto p-3 border-gray-200 overflow-x-auto">
          <div className="flex flex-wrap">
            {courses?.map((course) => (
              <div
                key={course._id}
                // onClick={() => navigate(`/courses/${course._id}`)}
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PurchasedCourses;
