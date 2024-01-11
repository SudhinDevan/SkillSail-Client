import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SyncLoader from "react-spinners/SyncLoader";
import { Rating } from "@mui/material";

const AboutCourseUserSide = ({ courseId }) => {
  const { id } = useSelector((state) => state.user);
  const AxiosInstance = UseAxiosPrivate();
  const [courses, setCourses] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [purchasedUser, setPurchasedUser] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [fetch, setFetch] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReviewShow, setIsReviewShow] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    rating: null,
    review: "",
    courseId,
    userId: id,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await AxiosInstance.get("/user/courseDetails", {
          params: { courseId },
        });
        console.log("res", res);
        setCourses(res.data.course);
        setChapters(res.data.chapter);
        setReviews(res.data.course.reviews);
        setPurchasedUser(res.data.course.students.includes(id));
        const isBuy = res.data.course.students.includes(id);
        const isReviewed = res.data.course.reviews.some(
          (obj) => obj.user._id === id
        );
        setIsBuy(isBuy);
        setIsReviewShow(isBuy && !isReviewed);
      } catch (err) {
        navigate("*");
        console.log(err.message);
      }
    };

    fetchData();
    setFetch(false);
  }, [fetch]);

  const paymentModal = () => {
    setIsModalVisible((prev) => !prev);
  };
  const handlepayment = async () => {
    try {
      const { data } = await AxiosInstance.post("/user/payment", {
        price: courses.price,
      });
      handleRazorPay(data.order);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRazorPay = (order) => {
    const options = {
      key: "rzp_test_jwaRXOYLK0lRRh",
      amount: order.amount,
      currency: order.currency,
      name: "SkillSail",
      description: "Test Transaction",
      order_id: order.id,
      theme: {
        color: "#004787", // Set your desired color
      },
      handler: async (response) => {
        try {
          const { data } = await AxiosInstance.post("/user/payment/verify", {
            response,
            userId: id,
            courseId: courses._id,
          });
          if (data.err) {
            toast.error(data.message);
          } else {
            paymentModal();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Successfully Purchased the Course",
              showConfirmButton: false,
              timer: 2500,
            });
            setTimeout(() => {
              navigate("/user/myLearning");
            }, 2500);
          }
        } catch (error) {
          console.error("Error:", error);
          toast.error("An error occurred. Please try again later.", {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        } finally {
          paymentModal();
        }
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on("payment.failed", (response) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: response.error.description,
      });
    });
  };

  const submitReview = async () => {
    if (values.rating === null || values.review.trim() === "") {
      toast.error("please give the review and rating");
      return;
    }

    AxiosInstance.post("/user/courseReview", values)
      .then((res) => {
        console.log(res);
        toast.success("Review added successfully");
        setFetch(true);
        setValues({
          review: "",
          rating: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {courses ? (
        <div className="p-3">
          <div className="flex justify-between">
            <span className="text-2xl font-bold">
              {courses.courseName}
              {` `}:
            </span>
            <div className="absolute top-32 right-3">
              {/* //////////////////// */}
              {chapters?.map((chapter) => (
                <div className="relative py-3" key={chapter._id}>
                  <button
                    id="dropdownDefaultButton"
                    className="text-gray-600 bg-gray-300 hover:text-gray-600 transition-colors duration-300 hover:bg-gray-200 focus:ring-2 focus:outline-none focus:ring-gray-400 font-semibold rounded-lg text-xl w-96 overflow-hidden px-2 py-2.5 text-center inline-flex items-center justify-center"
                    type="button"
                    onClick={() => {
                      if (purchasedUser) {
                        navigate(`/user/chapterDetails/${chapter._id}`);
                      }
                    }}
                  >
                    {chapter.chapterName}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col ml-3 p-5">
            <img
              src={courses.thumbnail.url}
              alt="thumbnail"
              className="w-1/4"
            />
          </div>
          <div className="p-3 mx-5 w-2/3">
            <span className="text-xl">
              <span className="font-bold">Course Blurb:{` `}</span>
              {courses.blurb}
            </span>
          </div>

          <div className="p-3 mx-5 w-2/3">
            <span className="font-bold text-lg">Description:{` `} </span>
            <div className="text-justify">{courses.description}</div>
          </div>
          {!purchasedUser && (
            <div
              onClick={paymentModal}
              className="w-1/3 border-2 mb-4 border-gray-300 shadow-md cursor-pointer transition-all duration-500 hover:-translate-y-3 p-3 mx-6 mt-5 h-24 flex flex-col justify-center text-center"
            >
              <button className="text-2xl font-semibold text-gray-500">
                BUY THIS COURSE
              </button>
              <span className="font-semibold text-gray-500">
                Only &#8377;{courses.price}
              </span>
            </div>
          )}
          {/* /////////////////////Review///////////////////////////// */}
          <div className="bg-gray-100 rounded-lg">
            <h1 className="text-2xl font-bold p-5">Course Review:</h1>
            <div className="w-full p-3 flex flex-col gap-2">
              {/* /////////////// */}
              {isReviewShow && (
                <div>
                  <div className="font-medium text-xl p-2">Rating:</div>
                  <Rating
                    name="rating"
                    onChange={(event, newValue) =>
                      setValues({ ...values, rating: newValue })
                    }
                  />
                  <div className="w-full mx-auto px-1">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg lg:text-xl font-bold text-gray-700">
                        write your review:
                      </h2>
                    </div>
                    <div className="mb-6">
                      <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-300">
                        <label className="sr-only">Your Review</label>
                        <textarea
                          name="comment"
                          rows="6"
                          className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                          placeholder="Write a review..."
                          value={values.review}
                          onChange={(e) =>
                            setValues({ ...values, review: e.target.value })
                          }
                          required
                        ></textarea>
                      </div>
                      <button
                        onClick={submitReview}
                        className="inline-flex items-center py-2.5 px-4 font-semibold text-base text-center rounded-lg border border-gray-300 hover:bg-gray-400"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {/* ///////// */}
              <div>
                <div className="font-medium pb-3 pl-1 text-lg">
                  What People have to say:
                </div>
                {reviews.length > 0 ? (
                  reviews?.map((review, i) => (
                    <article
                      key={i}
                      className="p-6 text-base bg-white rounded-lg mb-3"
                    >
                      <footer className="flex justify-between items-center mb-2">
                        <div className="flex items-center">
                          <p className="inline-flex items-center mr-3 text-sm text-gray-700 font-semibold">
                            <img
                              className="mr-2 w-6 h-6 rounded-full"
                              src={review?.user?.profilePic?.url}
                              alt="Michael Gough"
                            />
                            {review?.user?.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time>
                              {new Date(review?.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "numeric",
                                  month: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </time>
                          </p>
                        </div>
                      </footer>
                      <Rating name="rating" value={review?.rating} readOnly />
                      <p className="text-gray-500">{review?.review}</p>
                    </article>
                  ))
                ) : (
                  <article className="p-5 text-base bg-white rounded-lg mb-3">
                    <footer className="flex justify-between items-center mb-2">
                      <div className="flex items-center"></div>
                    </footer>
                    <p className="text-orange-400 text-xl font-semibold">
                      Be the first to Review the Course
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
              <div className="relative  w-full  max-w-lg max-h-full">
                <div className="relative bg-white rounded-lg shadow">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Buy this Course
                    </h3>

                    <button
                      onClick={paymentModal}
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
                  <div>
                    <h1 className="text-2xl font-bold px-5 pt-5 text-gray-600">
                      Course Name: {courses.courseName}
                    </h1>
                    <h1 className="text-2xl font-bold px-5 pt-3 pb-5 text-gray-600">
                      Price:{` `}
                      &#8377;{courses.price}/-
                    </h1>
                  </div>
                  <div className="flex justify-center items-center pb-5">
                    <button
                      onClick={handlepayment}
                      style={{ backgroundColor: "#004787" }}
                      className="p-3 border text-white text-xl font-bold hover:-translate-y-3 transition-all duration-500 border-gray-400 rounded-md"
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
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

AboutCourseUserSide.propTypes = {
  courseId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AboutCourseUserSide;
