import AboutCourse from "../../Components/AboutCourse/AboutCourse";
import Footer from "../../Components/Navbar/Footer";
import TutorNavbar from "../../Components/Navbar/TutorNavbar";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { courseId } = useParams();
  return (
    <>
      <TutorNavbar />
      <AboutCourse courseId={courseId} />
      <Footer />
    </>
  );
};

export default CourseDetails;
