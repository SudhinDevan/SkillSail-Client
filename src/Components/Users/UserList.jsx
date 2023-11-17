import { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/userlist")
      .then((res) => setUsers(res.data));
  }, [setUsers, users]);

  const accessChange = async (email, isAccess) => {
    const res = await axios.put("http://localhost:3000/admin/userAccess", {
      email,
      isAccess,
    });
    setUsers((preusers) => {
      return preusers.map((user) =>
        user.email === res.data.email
          ? { ...user, isAccess: res.data.isAccess }
          : user
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
            <td
              onClick={() => accessChange(user.email, user.isAccess)}
              className={`px-6 py-4 w-72 text-center cursor-pointer whitespace-no-wrap ${
                !user.isAccess ? "text-green-500" : "text-red-500"
              }`}
            >
              {user.isAccess ? "Block" : "Unblock"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
