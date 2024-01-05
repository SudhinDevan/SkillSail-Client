import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { SyncLoader } from "react-spinners";
import PropTypes from "prop-types";
import toast, { Toaster } from "react-hot-toast";

const AboutBlog = ({ blogId }) => {
  const axiosInstance = UseAxiosPrivate();
  const [blogDetails, setBlogDetails] = useState(null);
  const [isModal, setisModal] = useState(false);
  const [finalImage, setFinalImage] = useState(null);
  const [inputs, setInputs] = useState({
    heading: "",
    content: "",
    id: blogId,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/tutor/blogDetails", {
        params: { blogId },
      });
      setBlogDetails(response.data.blogDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleModal = () => {
    setisModal((prev) => !prev);
  };

  const handlechange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
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

  const editBlog = async () => {
    try {
      if (
        inputs.heading.trim() === "" &&
        inputs.content.trim() === "" &&
        finalImage === ""
      ) {
        return res.status(400);
      }
      const res = await axiosInstance.post("/tutor/editBlog", {
        inputs,
        image: finalImage,
      });
      const data = await res.data.blog;
      setBlogDetails({ ...data, status: res.status });
      return { ...data, status: res.status };
    } catch (error) {
      toggleModal();
      toast.error("Error Editing Blog", error.message);
      throw error;
    }
  };

  const handleEdit = (e) => {
    let toastId;
    e.preventDefault();
    toastId = toast.loading("loading...");
    editBlog()
      .then((res) => {
        if (res && res.status === 200) {
          toast.remove(toastId);
          toast.success("Blog Edited Successfully", {
            duration: 2500,
          });
          toggleModal();
        } else {
          toast.error("Unexpected response: ", res);
        }
      })
      .catch((err) => {
        console.error("Error editing Blog:", err.message);
        toast.remove(toastId);
        toast.error("Error editing Blog", { duration: 2000 });
      });
  };

  return (
    <>
      {blogDetails ? (
        <div>
          <div className="p-5 flex justify-center text-center flex-col">
            <h1 className="text-2xl font-semibold text-gray-700 pb-5">
              {blogDetails?.blogHeading}
            </h1>
            <h1 className="text-base font-semibold text-gray-700 pb-5">
              Story by{` `}
              {blogDetails?.author?.name}
            </h1>
            <h1 className="text-base font-semibold text-gray-700 pb-5">
              Posted on: {` `}
              {new Date(blogDetails?.createdAt).toLocaleDateString("en-GB")}
            </h1>
          </div>
          <img src={blogDetails?.thumbnail?.url} className="mx-auto md:w-1/2 w-full p-2" />
          <div className="pt-12 p-5 md:p-24 w-full text-justify">
            <span className="pt-3 text-lg">{blogDetails?.content}</span>
          </div>
          <div className="justify-end p-3 text-end">
            <button
              onClick={toggleModal}
              className="p-3 border border-gray-200 bg-gray-100 text-lg text-blue-700 font-semibold rounded-md hover:bg-gray-200"
            >
              Edit Blog
            </button>
            <Toaster />
          </div>
          {isModal && (
            <div
              aria-hidden="true"
              className="flex fixed bg-gray-300 bg-opacity-20 z-50 justify-center items-center w-full md:inset-0 max-h-full backdrop-filter backdrop-blur-sm"
            >
              <div className="relative  w-full  max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Create Chapter
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
                  <form className="p-4 md:p-5" onSubmit={handleEdit}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="heading"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Blog Heading
                        </label>
                        <input
                          type="text"
                          name="heading"
                          id="heading"
                          onChange={handlechange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder={blogDetails.blogHeading}
                          required=""
                        />
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="content"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Content
                        </label>
                        <input
                          type="text"
                          name="content"
                          id="content"
                          onChange={handlechange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder={blogDetails.content}
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="formFileLg"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Thumbnail
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

AboutBlog.propTypes = {
  blogId: PropTypes.string.isRequired,
};

export default AboutBlog;
