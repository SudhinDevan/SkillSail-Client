import ShowBlogDetails from "../../Components/BlogComponent/ShowBlogDetails";
import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";
import { useParams } from "react-router-dom";

const DisplayBlogDetails = () => {
  const { blogId } = useParams();
  return (
    <>
      <UserNavbar />
      <ShowBlogDetails blogId={blogId} />
      <Footer />
    </>
  );
};

export default DisplayBlogDetails;
