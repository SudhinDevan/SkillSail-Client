import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { useSelector } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";

const StudentListingTeacherSide = () => {
  const axiosPrivate = UseAxiosPrivate();
  const [students, setStudents] = useState(null);
  const { id } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.post("/tutor/studentListing", {
          id,
        });
        setStudents(response.data.studentsWithCourses);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {students ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-bold text-gray-500 uppercase tracking-wider">
                Index
              </th>
              <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-bold text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-bold text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-bold text-gray-500 uppercase tracking-wider">
                Enrolled Course
              </th>
              <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-bold text-gray-500 uppercase tracking-wider">
                Course Price
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {students?.map((user, i) => (
              <tr key={i}>
                <td className="px-6 py-4 text-center whitespace-no-wrap font-semibold">
                  {i + 1}
                </td>
                <td className="px-6 py-4 text-center whitespace-no-wrap font-semibold">
                  {user.student.name}
                </td>
                <td className="px-6 py-4 text-center whitespace-no-wrap font-semibold">
                  {user.student.email}
                </td>
                <td className="px-6 py-4 text-center whitespace-no-wrap font-semibold">
                  {user.course.courseName}
                </td>
                <td className="px-6 py-4 text-center whitespace-no-wrap font-semibold">
                  ₹{user.course.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

export default StudentListingTeacherSide;
