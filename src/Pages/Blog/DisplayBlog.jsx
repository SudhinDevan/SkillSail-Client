import ShowBlog from "../../Components/BlogComponent/ShowBlog";
import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";

const DisplayBlog = () => {
  return (
    <>
      <UserNavbar />
      <ShowBlog />
      <Footer />
    </>
  );
};

export default DisplayBlog;
