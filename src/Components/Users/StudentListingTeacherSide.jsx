import { useEffect, useState, useCallback } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { useSelector } from "react-redux";
import SyncLoader from "react-spinners/SyncLoader";
import Pagination from "../Utilities/Pagination";
import { debounce } from "lodash";

const StudentListingTeacherSide = () => {
  const axiosPrivate = UseAxiosPrivate();
  const [searchItem, setSearchItem] = useState("");
  const [students, setStudents] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const { id } = useSelector((state) => state.user);
  

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.post("/tutor/studentListing", {
        id,
      });
      console.log("useeffect", response.data.studentsWithCourses);
      setStudents(response.data.studentsWithCourses);
      setFilteredUsers(response.data.studentsWithCourses);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = useCallback(
    debounce(async (searchItem) => {
      try {
        const response = await axiosPrivate.get("/tutor/test", {
          params: { searchItem: searchItem, id: id },
        });
        console.log("sudhin", response.data.studentsWithCourses);
        setStudents(response.data.studentsWithCourses);
        setFilteredUsers(response.data.studentsWithCourses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }, 500),
    [id]
  );

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchItem(value);
    handleSearch(value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 2;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = filteredUsers?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      <div className="p-6">
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
              value={searchItem}
              onChange={handleChange}
              placeholder="Search Email..."
            />
          </div>
        </div>
        {/* ///////////////////////////// */}
        {currentPosts ? (
          currentPosts.length > 0 ? (
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
                {currentPosts.map((user, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 text-center whitespace-no-wrap font-semibold">
                      {i + 1 + currentPage * postPerPage - postPerPage}
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
            <div className="text-center items-center">
              <h1 className="text-2xl p-5">
                No transactions found for the Search Keyword{" "}
                <span className="text-blue-400">&#39;{searchItem}&#39;</span>
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

export default StudentListingTeacherSide;
