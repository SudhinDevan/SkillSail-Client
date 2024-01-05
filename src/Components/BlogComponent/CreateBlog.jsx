import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import SyncLoader from "react-spinners/SyncLoader";
import Pagination from "../Utilities/Pagination";
import { RiDeleteBin7Fill } from "react-icons/ri";
import Swal from "sweetalert2";

const CreateBlog = () => {
  const axiosInstance = UseAxiosPrivate();
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const { email } = useSelector((state) => state.user);
  const [finalImage, setFinalImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [filteredBlogs, setFilteredBlogs] = useState(null);
  const [inputs, setInputs] = useState({
    heading: "",
    content: "",
    email: email,
  });

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axiosInstance.get("/tutor/blogList", {
        params: { email },
      });
      setBlogs(response.data.blogList);
      setFilteredBlogs(response.data.blogList);
    } catch (error) {
      console.error("Error fetching course list:", error);
    }
  };

  const isValidFileUpload = (file) => {
    const validExtensions = ["png", "jpeg", "jpg"];
    const fileExtension = file.type.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const handleImage = (e) => {
    if (isValidFileUpload(e.target.files[0])) {
      ImageToBase(e.target.files[0]);
    } else {
      toast.error("Invalid file Format");
      return;
    }
  };

  const ImageToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFinalImage(reader.result);
    };
    reader.onerror = (error) => {
      toast.error("Error reading file: ", error.message);
    };
  };

  const handlechange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createBlog = async () => {
    try {
      const res = await axiosInstance.post("/tutor/createBlog", {
        inputs,
        image: finalImage,
      });
      const data = await res.data;
      return { ...data, status: res.status };
    } catch (error) {
      toast.error("Error creating Blog: ", error.message);
      throw error;
    }
  };

  const handleCreate = (e) => {
    let toastId;
    e.preventDefault();
    toastId = toast.loading("loading...");
    createBlog()
      .then((res) => {
        if (res && res.status === 200) {
          setFilteredBlogs((prev) => [...prev, res.blog]);
          toast.remove(toastId);
          toast.success("Blog Created Successfully", {
            duration: 2500,
          });
          toggleModal();
        } else {
          toast.error("Unexpected response: ", res);
        }
      })
      .catch((err) => {
        console.error("Error creating Blog:", err.message);
        toast.remove(toastId);
        toast.error("Error creating Blog", { duration: 2000 });
      });
  };

  const filterBlogFunction = (val) => {
    const filteredBlogs = blogs?.filter((item) => {
      return val.toLowerCase() === ""
        ? item
        : item.blogHeading.toLowerCase().includes(val);
    });

    setFilteredBlogs(filteredBlogs);
  };

  const deleteBlog = async (blogId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#fea663",
      cancelButtonColor: "#004787",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(
            `/tutor/deleteBlog/${blogId}`
          );
          if (response.status === 200) {
            fetchBlogs();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } else {
            Swal.fire({
              title: "Error",
              text: "Unable to delete the chapter.",
              icon: "error",
            });
          }
        } catch (error) {
          console.error("Error deleting chapter:", error);
          Swal.fire({
            title: "Error",
            text: "An error occurred while deleting the chapter.",
            icon: "error",
          });
        }
      }
    });
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 35;
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
          <div className="container mx-auto p-3 border-gray-200 w-screen overflow-x-hidden ">
            <div className="flex flex-wrap">
              {/* ////////////////////// */}
              {currentPosts &&
                currentPosts?.map((blog) => (
                  <div
                    key={blog._id}
                    className="p-4 cursor-pointer h-40 border-2 mr-10 mt-4 mb-3 w-full flex rounded shadow-md items-center hover:bg-gray-100"
                  >
                    <img
                      src={blog?.thumbnail.url}
                      alt="Thumbnail Image"
                      className="w-28 h-28 opacity-80 hover:opacity-100"
                    />
                    <div
                      className="md:w-5/6"
                      onClick={() => navigate(`/tutor/blogDetails/${blog._id}`)}
                    >
                      <h1 className="w-full md:text-xl text-sm font-bold text-gray-700 hover:text-gray-800 sm:px-40 px-5 md:px-14 mb-10 truncate overflow-hidden overflow-ellipsis">
                        {blog?.blogHeading} <br />{" "}
                        {new Date(blog?.createdAt).toLocaleDateString("en-GB")}
                      </h1>
                    </div>
                    <div className="ml-auto pt-1 hover:cursor-pointer hover:-translate-y-1 transition-all duration-300">
                      <RiDeleteBin7Fill
                        className="opacity-90"
                        size="25px"
                        onClick={() => deleteBlog(blog._id)}
                      />
                    </div>
                  </div>
                ))}
              {/* /////////////////plus component////////////// */}
              {blogs && (
                <div
                  onClick={toggleModal}
                  className="p-4 h-32 w-full mr-10 border-2 mt-4 mb-3 flex flex-col justify-center items-center rounded shadow-md  bg-white hover:bg-gray-100"
                >
                  <img
                    src="../../plus.png"
                    alt="plus"
                    className="w-14 opacity-80 hover:opacity-100"
                  />
                  <h1 className="text-3xl font-bold text-gray-700 text-center hover:text-gray-800 justify-center">
                    Add Blog
                  </h1>
                </div>
              )}
              {/* ////////////////////////////////////////////// */}
            </div>
          </div>
          {/* ////////////////////////Modal///////////////////////////////////// */}
          {isModalVisible && (
            <div
              aria-hidden="true"
              className="flex fixed bg-gray-300 bg-opacity-20 z-50 justify-center items-center w-full md:inset-0 max-h-full backdrop-filter backdrop-blur-sm"
            >
              <div className="relative  w-full  max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Create Blog
                    </h3>

                    <button
                      onClick={toggleModal}
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
                  <form className="p-4 md:p-5" onSubmit={handleCreate}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="heading"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Blog Heading <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="heading"
                          id="heading"
                          onChange={handlechange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder="Give a name to your Course"
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="content"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Blog Content <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="content"
                          id="content"
                          onChange={handlechange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 h-16"
                          placeholder="Course Description here"
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="formFileLg"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Thumbnail <span className="text-red-500">*</span>
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 relative m-0 block w-full min-w-0 flex-auto cursor-pointer border-solid bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-400 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-300 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                          id="formFileLg"
                          type="file"
                          accept=".jpeg,.png,.jpg"
                          onChange={handleImage}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <button
                        type="submit"
                        className="text-white inline-flex items-center bg-blue-400 hover:bg-blue-500 hover:text-gray-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          <div className="text-center justify-center p-5">
            <Pagination
              totalPosts={filteredBlogs?.length}
              postsPerPage={postPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
          <Toaster />
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

export default CreateBlog;
