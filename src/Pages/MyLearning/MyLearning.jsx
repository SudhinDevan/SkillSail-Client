import PurchasedCourses from "../../Components/Courses/PurchasedCourses";
import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";

const myLearning = () => {
  return (
    <>
      <UserNavbar />
      <PurchasedCourses/>
      <Footer />
    </>
  );
};

export default myLearning;
