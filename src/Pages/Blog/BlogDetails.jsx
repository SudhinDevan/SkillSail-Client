import AboutBlog from "../../Components/BlogComponent/AboutBlog";
import Footer from "../../Components/Navbar/Footer";
import TutorNavbar from "../../Components/Navbar/TutorNavbar";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { blogId } = useParams();
  return (
    <>
      <TutorNavbar />
      <AboutBlog blogId={blogId} />
      <Footer />
    </>
  );
};

export default BlogDetails;
