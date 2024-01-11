import { useEffect, useState } from "react";
import DetailsHome from "../../Components/HelperComponents/DetailsHome";
import SearchBar from "../../Components/HelperComponents/SearchBar";
import AxiosInstance from "../../Axios/AxiosInstance";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UserHome = () => {
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    const response = await AxiosInstance.get("/blog");
    setBlogs(response.data.blog);
  };

  const blogDetails = (id) => {
    if (role === 2000) {
      navigate(`/user/blog/${id}`);
    }
    if (!role) {
      Swal.fire({
        title: "You are not logged In!",
        text: "Login to continue!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fea663",
        cancelButtonColor: "#004787",
        confirmButtonText: "Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/user/login");
        }
      });
    }
  };

  return (
    <>
      <div className="bg-gray-100 h-auto">
        <div className="mx-auto p-2 border-b-4 border-gray-200">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/2 h-80 flex flex-col">
              <div className="p-3">
                <SearchBar />
              </div>
              <span className="font-semibold  text-lg lg:text-2xl p-5">
                UNLOCK THE WORLD OF KNOWLEDGE WITH SKILLSAIL
              </span>
              <span className="font-semibold lg:w-2/3 w-full text-lg lg:text-2xl p-5">
                START YOUR FAVOURITE COURSE BUILD YOUR BRIGHT CAREER
              </span>
              <div className="lg:mx-2">
                <button className="bg-teal-600 w-40 m-3 p-3 hover:bg-teal-700 text-lg rounded-lg text-white">
                  Explore Courses
                </button>
              </div>
            </div>
            <div className="w-full sm:w-1/2 p-2 h-80 flex flex-col items-center pt-5">
              <img src="../../mannobghome.png" className="w-72 lg:ml-auto" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-3 mx-auto">
          <span className="font-bold lg:text-2xl sm:text-xl">
            CHOOSE YOUR FAVOURITE CATEGORY
          </span>
        </div>
        <div className="container mx-auto p-3 border-b-2 border-gray-200">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/4 h-72 p-3 hover:-translate-y-3 transition-all duration-300 cursor-pointer">
              <DetailsHome name="Self Development" color="bg-orange-200" />
            </div>
            <div className="w-full sm:w-1/4 h-72 p-3 hover:-translate-y-3 transition-all duration-300 cursor-pointer">
              <DetailsHome name="Leadership" color="bg-red-200" />
            </div>
            <div className="w-full sm:w-1/4 h-72 p-3 hover:-translate-y-3 transition-all duration-300 cursor-pointer">
              <DetailsHome name="Business" color="bg-violet-200" />
            </div>
            <div className="w-full sm:w-1/4 h-72 p-3 hover:-translate-y-3 transition-all duration-300 cursor-pointer">
              <DetailsHome name="Marketing" color="bg-green-200" />
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="w-full lg:h-80 h-full p-2 bg-green-200 flex flex-col sm:flex-row items-center">
            <div className="w-full sm:w-1/2 flex flex-col items-center">
              <span className="text-3xl p-3 font-semibold">
                PLATFORM TO CONNECT AND BUILD YOUR CAREER
              </span>
              <span className="text-2xl p-3">
                &quot;OUR PLATFORM FACILITATES DIRECT COMMUNICATION BETWEEN
                USERS AND TUTORS. COLLABORATE, CONNECT, AND SHOWCASE YOUR
                PROJECTS TO ENGAGE WITH STARTUPS AND TOP COMPANIES IN WEB
                DEVELOPMENT AND AI.&quot;
              </span>
            </div>

            <img
              className="w-full sm:w-1/2  h-60 p-6"
              src="../../picture-home.png"
              alt=""
            />
          </div>
        </div>
        <div className="md:flex">
          {blogs &&
            blogs.map((blog, i) => (
              <div key={i} className="w-full h-96 p-3">
                <div className="h-full p-5 hover:bg-gray-200 rounded-md">
                  <img
                    src={blog.thumbnail.url}
                    className="w-72 h-48"
                    alt="img"
                  />
                  <h1 className="text-xl py-3 font-semibold">
                    {blog.blogHeading}
                  </h1>
                  <h1
                    className="font-semibold text-lg text-blue-400 text-end cursor-pointer hover:-translate-y-2 transition-all duration-500"
                    onClick={() => blogDetails(blog._id)}
                  >
                    Go to Blog &#10095;
                  </h1>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default UserHome;
