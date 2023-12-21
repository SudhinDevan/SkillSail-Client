import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { useSelector } from "react-redux";

const StudentListingTeacherSide = () => {
  const axiosPrivate = UseAxiosPrivate();
  const [students, setStudents] = useState([]);
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
          {students?.map((user, index) => (
            <tr key={user._id}>
              <td className="px-6 py-4 text-center whitespace-no-wrap font-semibold">
                {index + 1}
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
    </>
  );
};

export default StudentListingTeacherSide;
