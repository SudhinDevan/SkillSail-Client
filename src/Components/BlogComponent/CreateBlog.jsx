import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";

const CreateBlog = () => {
  const axiosInstance = UseAxiosPrivate();
  // const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const { email } = useSelector((state) => state.user);
  const [finalImage, setFinalImage] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputs, setInputs] = useState({
    heading: "",
    content: "",
    email: email,
  });

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axiosInstance.get("/tutor/blogList", {
          params: { email },
        });
        console.log("response: ", response);
        setBlogs(response.data.blogList || []);
      } catch (error) {
        console.error("Error fetching course list:", error);
      }
    };
    fetchBlogs();
  }, []);

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
      console.log("data", data);
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

  return (
    <>
      <div className="p-6">
        <span className="text-2xl font-bold">My Blogs: </span>
        <div className="container mx-auto p-3 border-gray-200 overflow-x-auto">
          <div className="flex flex-wrap">
            {/* ////////////////////// */}
            {blogs &&
              blogs?.map((blog) => (
                <div
                  key={blog._id}
                  className="p-4 h-32 border-2 mr-10 mt-4 mb-3 w-full rounded shadow-md flex flex-col items-center justify-center bg-white hover:bg-gray-100"
                >
                  <img
                    src={blog.thumbnail.url}
                    alt="Thumbnail Image"
                    className="w-14 h-40 opacity-80 hover:opacity-100"
                  />
                  <h1 className="text-xl font-bold text-gray-700 text-center hover:text-gray-800 justify-center p-2">
                    {blog.blogHeading}
                  </h1>
                </div>
              ))}
            {/* /////////////////plus component////////////// */}
            {blogs && (
              <div className="p-4 h-32 w-full mr-10 border-2 mt-4 mb-3 flex flex-col justify-center items-center rounded shadow-md  bg-white hover:bg-gray-100">
                <img
                  src="../../plus.png"
                  alt="plus"
                  className="w-14 opacity-80 hover:opacity-100"
                  onClick={toggleModal}
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
      </div>
      <Toaster />
    </>
  );
};

export default CreateBlog;
