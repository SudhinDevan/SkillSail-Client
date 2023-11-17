import { useEffect, useState } from "react";
import axios from "axios";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/teachers")
      .then((res) => setTeachers(res.data));
  }, [teachers]);

  const accessChange = async (email, isAccess) => {
    const res = await axios.put("http://localhost:3000/admin/teacherAccess", {
      email,
      isAccess,
    });
    setTeachers((preUsers) => {
      return preUsers.map((teacher) =>
        teacher.email === res.data.email
          ? { ...teacher, isAccess: res.data.isAccess }
          : teacher
      );
    });
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Index
          </th>
          <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 bg-gray-50 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {teachers.map((teacher, index) => (
          <tr key={teacher._id}>
            <td className="px-6 py-4 text-center whitespace-no-wrap">
              {index + 1}
            </td>
            <td className="px-6 py-4 text-center whitespace-no-wrap">
              {teacher.name}
            </td>
            <td className="px-6 py-4 text-center whitespace-no-wrap">
              {teacher.email}
            </td>
            <td
              className={`px-6 py-4 w-72 text-center whitespace-no-wrap ${
                teacher.isAccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {teacher.isAccess ? "Active" : "Inactive"}
            </td>
            <td
              onClick={() => accessChange(teacher.email, teacher.isAccess)}
              className={`px-6 py-4 w-72 text-center cursor-pointer whitespace-no-wrap ${
                !teacher.isAccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {teacher.isAccess ? "Block" : "Unblock"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeacherList;
