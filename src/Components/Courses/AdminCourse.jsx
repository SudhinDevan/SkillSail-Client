import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { SyncLoader } from "react-spinners";
import Pagination from "../Utilities/Pagination";

const AdminCourse = () => {
  const axiosPrivate = UseAxiosPrivate();
  const [course, setCourse] = useState(null);
  const [search, setSearch] = useState("");
  const [filterCourseDatas, setFilterCourseDatas] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosPrivate.get("/admin/courseList");
      setCourse(response.data.course);
      setFilterCourseDatas(response.data.course);
    } catch (error) {
      console.log(error);
    }
  };

  const filterCourseFunction = (val) => {
    setSearch(val);
    const filteredCourses = course?.filter((item) => {
      return val.toLowerCase() === ""
        ? item
        : item.courseName.toLowerCase().includes(val);
    });

    setFilterCourseDatas(filteredCourses);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 2;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = filterCourseDatas?.slice(firstPostIndex, lastPostIndex);

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
                filterCourseFunction(e.target.value);
              }}
              placeholder="Search something.."
            />
          </div>
        </div>
        {/* ///////////////////////////// */}
        {currentPosts ? (
          currentPosts.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-xs w-2/12 text-center leading-4 font-bold text-gray-500 uppercase tracking-wider">
                    Index
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs w-2/12 text-center leading-4 font-bold text-gray-500 uppercase tracking-wider">
                    Course Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs w-2/12 text-center leading-4 font-bold text-gray-500 uppercase tracking-wider">
                    Tutor Name
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs w-2/12 text-center leading-4 font-bold text-gray-500 uppercase tracking-wider">
                    Course Price
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-xs w-2/12 text-center leading-4 font-bold text-gray-500 uppercase tracking-wider">
                    Number of Students
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPosts.map((user, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 text-center whitespace-no-wrap font-semibold w-2/12">
                      {i + 1}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap font-semibold w-2/12">
                      {user.courseName}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap font-semibold w-2/12">
                      {user.tutor.name}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap font-semibold w-2/12">
                      ₹ {user.price}
                    </td>
                    <td className="px-6 py-4 text-center whitespace-no-wrap font-semibold w-2/12">
                      {user.students.length}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center items-center">
              <h1 className="text-2xl p-5">
                No courses found for the Search Keyword{" "}
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
            totalPosts={filterCourseDatas?.length}
            postsPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default AdminCourse;
