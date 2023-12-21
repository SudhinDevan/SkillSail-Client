import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import Swal from "sweetalert2";

const UserList = () => {
  const axiosPrivate = UseAxiosPrivate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosPrivate.get("/admin/userlist").then((res) => setUsers(res.data));
  }, [setUsers, users]);

  const accessChange = async (email, isAccess) => {
    const actionText = isAccess ? "Block" : "Unblock";
    const onConfirm = isAccess ? "Blocked" : "UnBlocked";
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
          .put("/admin/userAccess", {
            email,
            isAccess,
          })
          .then((response) => {
            Swal.fire({
              title: `${onConfirm}`,
              text: `The user is ${onConfirm}.`,
              icon: "success",
            });

            // Assuming response.data contains updated user information
            setUsers((prevUsers) => {
              return prevUsers.map((user) =>
                user.email === response.data.email
                  ? { ...user, isAccess: response.data.isAccess }
                  : user
              );
            });
          })
          .catch((error) => {
            // Handle error if the axios request fails
            console.error("Error blocking user:", error);
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
        {users.map((user, index) => (
          <tr key={user._id}>
            <td className="px-6 py-4 text-center whitespace-no-wrap">
              {index + 1}
            </td>
            <td className="px-6 py-4 text-center whitespace-no-wrap">
              {user.name}
            </td>
            <td className="px-6 py-4 text-center whitespace-no-wrap">
              {user.email}
            </td>
            <td
              className={`px-6 py-4 w-72 text-center whitespace-no-wrap ${
                user.isAccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {user.isAccess ? "Active" : "Inactive"}
            </td>
            <td className="px-6 py-4 text-center whitespace-no-wrap">
              <button
                onClick={() => accessChange(user.email, user.isAccess)}
                className={`cursor-pointer ${
                  !user.isAccess ? "text-green-500" : "text-red-500"
                } border-2 border-gray-300 rounded-md w-24 h-10`}
              >
                {user.isAccess ? "Block" : "Unblock"}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
