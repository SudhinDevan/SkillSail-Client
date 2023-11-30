import { useEffect, useState } from "react";
import AxiosInstance from "../../Axios/AxiosInstance";
import Swal from "sweetalert2";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  useEffect(() => {
    AxiosInstance.get("/admin/teacherRequest").then((res) =>
      setTeachers(res.data)
    );
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
        AxiosInstance.put("/admin/teacherAccess", {
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
            Document
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
              {teacher.verifyDocument.format}
            </td>
            <td className="px-6 py-4 text-center whitespace-no-wrap">
              {teacher.email}
            </td>
            <td className="px-6 py-4 text-center whitespace-no-wrap">
              <button
                onClick={toggleModal}
                className={`cursor-pointer border-2 border-gray-300 hover:bg-gray-100 text-orange-500 rounded-md w-24 h-10`}
              >
                View
              </button>
            </td>
            {isModalVisible && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-300 bg-opacity-20 backdrop-filter backdrop-blur-sm">
                <div className="w-full max-w-md max-h-full bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Submitted Document
                    </h3>

                    <button
                      onClick={toggleModal}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
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
                  <img
                    src={teacher.verifyDocument.url}
                    alt="Document Preview"
                  />
                </div>
              </div>
            )}
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
                className={`cursor-pointer border-2 hover:bg-gray-100 border-gray-300 rounded-md w-24 h-10 ${
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

export default TeacherList;
