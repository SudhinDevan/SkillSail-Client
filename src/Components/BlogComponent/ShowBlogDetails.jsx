import { useEffect, useState } from "react";
import UseAxiosPrivate from "../../Hooks/UseAxiosPrivate";
import { SyncLoader } from "react-spinners";
import PropTypes from "prop-types";

const ShowBlogDetails = ({ blogId }) => {
  const axiosInstance = UseAxiosPrivate();
  const [blogDetails, setBlogDetails] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/user/blogDetails", {
        params: { blogId },
      });
      setBlogDetails(response.data.blogDetails);
    } catch (error) {
      console.log(error);
    }
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
          <img
            src={blogDetails?.thumbnail?.url}
            className="mx-auto md:w-1/2 w-full p-2"
          />
          <div className="pt-12 p-5 md:p-24 w-full text-justify">
            <span className="pt-3 text-lg">{blogDetails?.content}</span>
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

ShowBlogDetails.propTypes = {
  blogId: PropTypes.string.isRequired,
};

export default ShowBlogDetails;
