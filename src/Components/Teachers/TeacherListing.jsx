import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import Swal from "sweetalert2";

const TeacherListing = () => {
  const axiosPrivate = UseAxiosPrivate();
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    axiosPrivate
      .get("/admin/teacherListing")
      .then((res) => setTeachers(res.data));
  }, [teachers]);

  const accessChange = async (email, isAccess) => {
    const actionText = isAccess ? "Block" : "Unblock";
    const onConfirm = isAccess ? "Blocked" : "Unblocked";

    Swal.fire({
      title: "Are you sure",
      text: `You want to ${actionText} this user!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fea663",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${actionText} User!`,
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPrivate
          .put("/admin/teacherAccess", {
            email,
            isAccess,
          })
          .then((response) => {
            Swal.fire({
              title: `${onConfirm}`,
              text: `The user is ${onConfirm}.`,
              icon: "success",
            });

            setTeachers((preTeachers) => {
              return preTeachers.map((teacher) =>
                teacher.email === response.data.email
                  ? { ...teacher, isAccess: response.data.isAccess }
                  : teacher
              );
            });
          })
          .catch((error) => {
            // Handle error if the axios request fails
            console.error("Error updating teacher access:", error);
          });
      }
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
            <td className="px-6 py-4 text-center whitespace-no-wrap">
              <button
                onClick={() => accessChange(teacher.email, teacher.isAccess)}
                className={`cursor-pointer border-2 border-gray-300 rounded-md w-24 h-10 ${
                  !teacher.isAccess ? "text-green-500" : "text-red-500"
                }`}
              >
                {teacher.isAccess ? "Block" : "Unblock"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeacherListing;
