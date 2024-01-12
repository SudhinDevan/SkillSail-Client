import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import toast, { Toaster } from "react-hot-toast";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import SyncLoader from "react-spinners/SyncLoader";
import Swal from "sweetalert2";
import Rating from "@mui/material/Rating";

const AboutCourse = ({ courseId }) => {
  const AxiosInstance = UseAxiosPrivate();
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseModal, setCourseModal] = useState(false);
  const [chapterDetails, setChapterDetails] = useState(null);
  const [file, setFile] = useState(null);
  const [isChecked, setIsChecked] = useState(null);
  const [review, setReview] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [inputs, setInputs] = useState({
    chapterName: "",
    description: "",
    courseId: courseId,
    chapterNum: "",
    isCompleted: "",
  });

  const [changes, setChanges] = useState({
    courseName: "",
    Blurb: "",
    Description: "",
    Price: "",
    isCompleted: "",
    courseId: courseId,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await AxiosInstance.get("/tutor/courseDetails", {
          params: { courseId },
        });
        setReview(response.data.courseData.reviews);
        setCourseDetails(response.data.courseData);
        setIsChecked(response.data.courseData.isCompleted);
      } catch (error) {
        navigate("/*");
        console.error("something went wrong", error);
      }
    };

    fetchData();

    const chapterFetch = async () => {
      try {
        const response = await AxiosInstance.get("/tutor/chapterListing", {
          params: { courseId },
        });
        setChapterDetails(response.data.chapterData);
      } catch (error) {
        console.error("error fetching chapter details", error);
      }
    };

    chapterFetch();
  }, [courseId, AxiosInstance]);

  const toggleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handlechange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValidFileUpload = (file) => {
    const validExtensions = ["mkv", "mp4"];
    const fileExtension = file.type.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const handleFile = (e) => {
    if (isValidFileUpload(e.target.files[0])) {
      FiletoBase(e.target.files[0]);
    } else {
      toast.error("Invalid File Format");
      return;
    }
  };

  const FiletoBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFile(reader.result);
    };
    reader.onerror = (error) => {
      toast.error("Error reading File: ", error.message);
    };
  };

  const newChapter = async () => {
    try {
      let toastId = toast.loading("Loading...");
      const response = await AxiosInstance.post("/tutor/createChapter", {
        inputs,
        file: file,
      });
      if (response.status === 201) {
        toast.remove(toastId);
        toast.success("Chapter created successfully", { duration: 2500 });
        setChapterDetails((prevChapterDetails) => {
          return prevChapterDetails
            ? [...prevChapterDetails, response.data.chapter]
            : [response.data.chapter];
        });
        toggleModal();
        return response.data;
      } else {
        toast.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    await newChapter();
  };

  const deleteChapter = async (chapterId) => {
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
          const response = await AxiosInstance.delete(
            `/tutor/courseDetails/chapter/${chapterId}`
          );
          if (response.status === 200) {
            setChapterDetails((prevChapterDetails) =>
              prevChapterDetails.filter((chapter) => chapter._id !== chapterId)
            );
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          } else {
            // Handle other response statuses if needed
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

  const editChange = (e) => {
    setChanges((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const editCourseModal = () => {
    setCourseModal((prev) => !prev);
  };

  const isValidImageUpload = (file) => {
    const validExtensions = ["png", "jpeg", "jpg"];
    const fileExtension = file.type.split("/")[1];
    return validExtensions.includes(fileExtension);
  };

  const handleImage = (e) => {
    if (isValidImageUpload(e.target.files[0])) {
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

  const editCourseDetails = async (e) => {
    e.preventDefault();
    try {
      let toastId = toast.loading("Loading...");
      const response = await AxiosInstance.put("/tutor/courseDetails/edit", {
        changes,
        image: finalImage,
        isChecked,
      });
      toast.remove(toastId);
      setCourseDetails(response.data.course);
      editCourseModal();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your work has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const calculateAverageRating = (review) => {
    if (!review || review.length === 0) {
      return 0;
    }

    const totalRating = review.reduce(
      (sum, reviewItem) => sum + reviewItem.rating,
      0
    );
    const averageRating = totalRating / review.length;

    return averageRating;
  };

  return (
    <>
      {courseDetails && chapterDetails ? (
        <div className="p-3">
          <div className="flex justify-between">
            <span className="text-2xl font-bold">
              {courseDetails.courseName}
              {` `}:
            </span>
            <div className="absolute top-32 right-3">
              {/* //////////////////// */}
              {chapterDetails?.map((chapter) => (
                <div
                  className="text-gray-600 bg-gray-300 hover:text-gray-600 transition-colors duration-300 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-400 font-semibold rounded-lg text-xl w-96 overflow-hidden py-2.5 text-center flex p-3 m-3 px-3"
                  key={chapter._id}
                >
                  <button
                    id="dropdownDefaultButton"
                    type="button"
                    onClick={() =>
                      navigate(`/tutor/chapterDetails/${chapter._id}`)
                    }
                  >
                    {chapter.index}.{` `}
                    {chapter.chapterName}
                    {` `}
                  </button>
                  {!courseDetails.isCompleted && (
                    <span className="ml-auto pt-1 hover:cursor-pointer hover:-translate-y-1 transition-all duration-300">
                      <RiDeleteBin7Fill
                        className="opacity-90"
                        onClick={() => deleteChapter(chapter._id)}
                      />
                    </span>
                  )}
                </div>
              ))}
              {/* ///////////////// */}
              {!courseDetails.isCompleted && (
                <div
                  onClick={toggleModal}
                  className="text-green-700 bg-gray-300 hover:text-green-800 transition-colors duration-300 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-400 font-semibold rounded-lg text-xl w-96 overflow-hidden py-2.5 text-center justify-center flex p-3 m-3 px-3 "
                >
                  <button id="dropdownDefaultButton" type="button">
                    Add Chapter +
                  </button>
                </div>
              )}
              {/* ////////////////// */}
              <div
                onClick={editCourseModal}
                className="text-orange-500 bg-gray-300 hover:text-orange-600 transition-colors duration-300 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-400 font-semibold rounded-lg text-xl w-96 overflow-hidden py-2.5 text-center justify-center flex p-3 m-3 px-3 "
              >
                <button id="dropdownDefaultButton" type="button">
                  Edit Course
                </button>
              </div>
              {/* ////////////////// */}
            </div>
          </div>
          <div className="flex flex-col ml-3 p-5">
            <img
              src={courseDetails.thumbnail.url}
              alt="thumbnail"
              className=" w-1/4"
            />
          </div>
          <div className="p-3 mx-5 w-2/3">
            <span className="text-xl">
              <span className="font-bold">Course Blurb:{` `}</span>
              {courseDetails.blurb}
            </span>
          </div>
          <div className="p-3 mx-5 w-2/3">
            <span className="font-bold text-lg">Description:{` `} </span>
            <div className="text-justify">{courseDetails.description}</div>
          </div>
          <div className="p-3 mx-5 w-2/3">
            <span className="font-bold text-lg">
              Price:{` `}
              <span className="text-base">₹{courseDetails.price}</span>
            </span>
          </div>
          {/* /////////////////////Review///////////////////////////// */}
          <div className="bg-gray-100 rounded-lg">
            <h1 className="text-2xl font-bold p-5">Course Review:</h1>
            <div className="w-full p-3 flex flex-col gap-2">
              {review && (
                <div>
                  <div className="font-medium text-xl p-2">
                    Rating: {calculateAverageRating(review)}
                  </div>
                  <Rating
                    name="half-rating"
                    defaultValue={calculateAverageRating(review)}
                    precision={0.25}
                    readOnly
                  />
                </div>
              )}
              <div>
                <div className="font-medium pb-3 pl-1 text-lg">
                  What People have to say:
                </div>
                {review.length > 0 ? (
                  review.map((reviewItem, i) => (
                    <article
                      className="p-6 text-base bg-white rounded-lg mb-2"
                      key={i}
                    >
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 text-sm text-gray-700 font-semibold">
                            <img
                              className="mr-2 w-6 h-6 rounded-full"
                              src={reviewItem?.user?.profilePic?.url}
                              alt="User Profile"
                            />
                            {reviewItem?.user?.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time>Feb. 8, 2022</time>
                          </p>
                        </div>
                      </footer>
                      <p className="text-gray-500 dark:text-gray-400">
                        {reviewItem?.review}
                      </p>
                    </article>
                  ))
                ) : (
                  <article className="p-5 text-base bg-white rounded-lg mb-3">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center"></div>
                    </footer>
                    <p className="text-orange-400 text-xl font-semibold">
                      No reviews yet!
                    </p>
                  </article>
                )}
              </div>
            </div>
          </div>

          {/* ////////////////////////////////////////////////// */}
          {isModalVisible && (
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
                  <form className="p-4 md:p-5" onSubmit={handleCreate}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                      <div className="col-span-2">
                        <label
                          htmlFor="chapterName"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Chapter Name
                        </label>
                        <input
                          type="text"
                          name="chapterName"
                          id="chapterName"
                          onChange={handlechange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder="Give a name to your Chapter"
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
                          placeholder="Chapter Description here"
                          required=""
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="chapterNum"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Chapter Number
                        </label>
                        <input
                          type="number"
                          name="chapterNum"
                          id="chapterNum"
                          onChange={handlechange}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                          placeholder="Chapter Description here"
                          required=""
                          min="1"
                        />
                      </div>
                      <div className="col-span-2">
                        <label
                          htmlFor="formFileLg"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Upload Video
                        </label>
                        <input
                          className="bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 p-2.5 relative m-0 block w-full min-w-0 flex-auto cursor-pointer border-solid bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-400 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-300 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
                          id="formFileLg"
                          type="file"
                          accept=".mp4, .mkv"
                          onChange={handleFile}
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
          <div>
            {courseModal && (
              <div
                aria-hidden="true"
                className="flex fixed bg-gray-300 bg-opacity-20 z-50 justify-center items-center w-full md:inset-0 max-h-full backdrop-filter backdrop-blur-sm"
              >
                <div className="relative  w-full  max-w-md max-h-full">
                  <div className="relative bg-white rounded-lg shadow">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Edit Course
                      </h3>

                      <button
                        onClick={editCourseModal}
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
                    <form className="p-4 md:p-5" onSubmit={editCourseDetails}>
                      <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                          <label
                            htmlFor="courseName"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Course Name
                          </label>
                          <input
                            type="text"
                            name="courseName"
                            id="courseName"
                            onChange={editChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder={courseDetails.courseName}
                          />
                        </div>

                        <div className="col-span-2">
                          <label
                            htmlFor="Blurb"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Blurb
                          </label>
                          <input
                            type="text"
                            name="Blurb"
                            id="Blurb"
                            onChange={editChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder={courseDetails.blurb}
                          />
                        </div>
                        <div className="col-span-2">
                          <label
                            htmlFor="Description"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Description
                          </label>
                          <input
                            type="text"
                            name="Description"
                            id="Description"
                            onChange={editChange}
                            className="bg-gray-50 border h-24 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder={courseDetails.description}
                            min="1"
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
                        <div className="col-span-2">
                          <label
                            htmlFor="Price"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Price
                          </label>
                          <input
                            type="text"
                            name="Price"
                            id="Price"
                            onChange={editChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            placeholder={`₹ ${courseDetails.price}`}
                            min="1"
                          />
                        </div>
                      </div>
                      <div className="flex pb-3">
                        <div>
                          <label className="flex cursor-pointer select-none items-center">
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                className="sr-only"
                              />
                              <div className="block h-8 w-14 rounded-full bg-gray-200"></div>
                              <div
                                className={`dot absolute top-1 h-6 w-6 rounded-full transition-all duration-700 ${
                                  isChecked
                                    ? "bg-blue-600 left-7"
                                    : "left-1 bg-white"
                                }`}
                              ></div>
                            </div>
                          </label>
                        </div>
                        {isChecked ? (
                          <span className="font-semibold p-1 pl-3">Public</span>
                        ) : (
                          <span className="font-semibold p-1 pl-3">
                            Private
                          </span>
                        )}
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

AboutCourse.propTypes = {
  courseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AboutCourse;
