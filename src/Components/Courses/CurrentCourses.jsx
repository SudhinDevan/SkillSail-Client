import { useSelector } from "react-redux";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CurrentCourse = () => {
  const axiosPrivate = UseAxiosPrivate();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { email } = useSelector((state) => state.user);
  const [finalImage, setFinalImage] = useState(null);
  const [inputs, setInputs] = useState({
    coursename: "",
    blurb: "",
    description: "",
    aboutAuthor: "",
    price: "",
    email: email,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axiosPrivate.get("/tutor/courseList", {
          params: { email },
        });
        console.log("response: ", response.data);
        setCourses(response.data.coursesList || []);
      } catch (error) {
        console.error("Error fetching course list:", error);
      }
    };
    fetchCourses();
  }, [isModalVisible, axiosPrivate, email]);

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

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handlechange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const createCourse = async () => {
    try {
      const res = await axiosPrivate.post("/tutor/createCourse", {
        inputs,
        image: finalImage,
      });
      const data = await res.data;
      return { ...data, status: res.status };
    } catch (error) {
      toast.error("Error creating Course: ", error.message);
      throw error;
    }
  };

  const handleCreate = (e) => {
    let toastId;
    e.preventDefault();
    const pricePattern = /^\d+(\.\d{1,2})?$/;
    if (
      inputs.coursename.trim() === "" ||
      inputs.blurb.trim() === "" ||
      inputs.description.trim() === "" ||
      inputs.aboutAuthor.trim() === "" ||
      inputs.price.trim() === "" ||
      !pricePattern.test(inputs.price)
    ) {
      toast.error("Enter Valid Details", { duration: 2000 });
      return;
    }
    if (!finalImage) {
      toast.error("Please select a Thumbnail for your course", {
        duration: 3000,
      });
      return;
    }
    toastId = toast.loading("loading...");
    createCourse()
      .then((res) => {
        if (res && res.status === 200) {
          toast.remove(toastId);
          toast.success("Course Created Successfully", {
            duration: 2500,
          });
          toggleModal();
        } else {
          toast.error("Unexpected response: ", res);
        }
      })
      .catch((err) => {
        console.error("Error creating course:", err.message);
        toast.remove(toastId);
        toast.error("Error creating course", { duration: 2000 });
      });
  };

  return (
    <>
      <div className="p-6">
        <span className="text-3xl font-bold">Classes: </span>
        <div className="container mx-auto p-3 border-gray-200 overflow-x-auto">
          <div className="flex flex-wrap">
            {/* ////////////////////// */}
            {courses.map((course) => (
              <div
                key={course._id}
                onClick={() => navigate(`/tutor/courseDetails/${course._id}`)}
                className="p-4 h-60 border-2 mr-10 mt-4 mb-3 w-80 rounded shadow-md flex flex-col items-center justify-center bg-white hover:bg-gray-100"
              >
                <img
                  src={course.thumbnail.url}
                  alt="plus"
                  className="w-52 h-40 opacity-80 hover:opacity-100"
                />
                <h1 className="text-xl font-bold text-gray-700 text-center hover:text-gray-800 justify-center p-2">
                  {course.courseName}
                </h1>
              </div>
            ))}
            {/* /////////////////plus component////////////// */}
            <div className="p-4 h-60 w-80 mr-10 border-2 mt-4 mb-3 flex flex-col justify-center items-center rounded shadow-md  bg-white hover:bg-gray-100">
              <img
                src="../../plus.png"
                alt="plus"
                className="w-36 opacity-80 hover:opacity-100"
                onClick={toggleModal}
              />
              <h1 className="text-3xl font-bold text-gray-700 text-center hover:text-gray-800 justify-center">
                ADD COURSE
              </h1>
            </div>
            {/* ////////////////////////////////////////////// */}
          </div>
        </div>
        {isModalVisible && (
          <div
            aria-hidden="true"
            className="flex fixed bg-gray-300 bg-opacity-20 z-50 justify-center items-center w-full md:inset-0 max-h-full backdrop-filter backdrop-blur-sm"
          >
            <div className="relative  w-full  max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Create Course
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
                        htmlFor="coursename"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Course Name
                      </label>
                      <input
                        type="text"
                        name="coursename"
                        id="coursename"
                        onChange={handlechange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Give a name to your Course"
                        required=""
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="blurb"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Short Description
                      </label>
                      <input
                        type="text"
                        name="blurb"
                        id="blurb"
                        onChange={handlechange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Give a short description"
                        required=""
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Description
                      </label>
                      <input
                        type="text"
                        name="description"
                        id="description"
                        onChange={handlechange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Course Description here"
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
                        onChange={handleImage}
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="aboutAuthor"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        About the Author
                      </label>
                      <input
                        type="text"
                        name="aboutAuthor"
                        id="aboutAuthor"
                        onChange={handlechange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Description about the Author"
                        required=""
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Course Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        id="price"
                        onChange={handlechange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Enter the course price"
                        required=""
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

export default CurrentCourse;
