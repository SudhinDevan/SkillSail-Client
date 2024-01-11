import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import SyncLoader from "react-spinners/SyncLoader";
import Pagination from "../Utilities/Pagination";

const ShowBlog = () => {
  const axiosInstance = UseAxiosPrivate();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axiosInstance.get("/user/blogList");
      setBlogs(response.data.blogs);
      setFilteredBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching course list:", error);
    }
  };

  const filterBlogFunction = (val) => {
    const filteredBlogs = blogs?.filter((item) => {
      return val.toLowerCase() === ""
        ? item
        : item.blogHeading.toLowerCase().includes(val);
    });

    setFilteredBlogs(filteredBlogs);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 5;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const currentPosts = filteredBlogs?.slice(firstPostIndex, lastPostIndex);

  return (
    <>
      {currentPosts ? (
        <div className="p-6">
          {/* /////////////search//////////////// */}
          <div className="md:max-w-xl md:mx-auto pb-3">
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
                onChange={(e) => filterBlogFunction(e.target.value)}
                placeholder="Search Blogs.."
              />
            </div>
          </div>
          {/* ///////////////////////////// */}
          <span className="text-2xl font-bold">My Blogs: </span>
          <div className="container mx-auto p-3 border-gray-200 overflow-x-auto">
            <div className="flex flex-wrap">
              {currentPosts &&
                currentPosts?.map((blog) => (
                  <div
                    key={blog._id}
                    className="p-4 cursor-pointer h-40 border-2 mr-10 mt-4 mb-3 w-full flex rounded shadow-md items-center bg-white hover:bg-gray-100"
                    onClick={() => navigate(`/user/blog/${blog._id}`)}
                  >
                    <img
                      src={blog?.thumbnail.url}
                      alt="Thumbnail Image"
                      className="w-28 h-28 opacity-80 hover:opacity-100"
                    />
                    <h1 className="text-xl font-bold text-gray-700 hover:text-gray-800 sm:px-40 px-14 mb-10">
                      {blog?.blogHeading} <br />{" "}
                      {new Date(blog?.createdAt).toLocaleDateString("en-GB")}
                    </h1>
                  </div>
                ))}
            </div>
          </div>
          <div className="text-center justify-center p-5">
            <Pagination
              totalPosts={filteredBlogs?.length}
              postsPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </div>
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

export default ShowBlog;
