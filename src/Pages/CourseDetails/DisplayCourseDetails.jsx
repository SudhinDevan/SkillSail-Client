import AboutCourseUserSide from "../../Components/AboutCourse/AboutCourseUserSide";
import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";
import { useParams } from "react-router-dom";

const DisplayCourseDetails = () => {
  const { courseId } = useParams();
  return (
    <>
      <UserNavbar />
      <AboutCourseUserSide courseId={courseId} />
      <Footer />
    </>
  );
};

export default DisplayCourseDetails;
