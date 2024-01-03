import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import Swal from "sweetalert2";
import SyncLoader from "react-spinners/SyncLoader";
import Pagination from "../Utilities/Pagination";

const UserList = () => {
  const axiosPrivate = UseAxiosPrivate();
  const [users, setUsers] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get("/admin/userlist");
      setUsers(response.data.userList);
      setFilteredUsers(response.data.userList);
    } catch (error) {
      console.error(error);
    }
  };

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

            setUsers((prevUsers) => {
              return prevUsers.map((user) =>
                user.email === response.data.email
                  ? { ...user, isAccess: response.data.isAccess }
                  : user
              );
            });
          })
          .catch((error) => {
            console.error("Error blocking user:", error);
          });
      }
    });
  };

  const filterUserFunction = (val) => {
    setSearch(val);
    const filteredUser = users?.filter((item) => {
      return val.toLowerCase() === ""
        ? item
        : item.email.toLowerCase().includes(val);
    });

    setFilteredUsers(filteredUser);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 2;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = filteredUsers?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className="my-8">
        {/* /////////////search//////////////// */}
        <div className="md:max-w-xl md:mx-auto p-3">
          <div className="relative flex border border-gray-300 items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-gray-100 overflow-hidden">
            <div className="grid place-items-center h-full w-12 text-gray-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              className="peer h-full w-full outline-none text-sm pl-3 text-gray-700 pr-2 placeholder:pl-5"
              type="text"
              id="search"
              onChange={(e) => {
                filterUserFunction(e.target.value);
              }}
              placeholder="Search User Emails..."
            />
          </div>
        </div>
        {/* ///////////////////////////// */}
        {currentPosts ? (
          currentPosts.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-xs w-2/12 text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Index
                  </th>
                  <th className="px-6 py-3 bg-gray-50 w-2/12 text-xs text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs w-2/12 text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs w-2/12 text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs w-2/12 text-center leading-4 font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPosts.map((user, index) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 text-center whitespace-no-wrap w-2/12">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap w-2/12">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap w-2/12">
                      {user.email}
                    </td>
                    <td
                      className={`px-6 py-4 text-center whitespace-no-wrap w-2/12 ${
                        user.isAccess ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {user.isAccess ? "Active" : "Inactive"}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap w-2/12">
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
          ) : (
            <div className="text-center items-center">
              <h1 className="text-2xl p-5">
                No users found for the Search Keyword{" "}
                <span className="text-blue-400">&#39;{search}&#39;</span>
              </h1>
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
        <div className="text-center justify-center p-5">
          <Pagination
            totalPosts={filteredUsers?.length}
            postsPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default UserList;
