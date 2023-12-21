import AboutCourse from "../../Components/AboutCourse/AboutCourse";
import Footer from "../../Components/Navbar/Footer";
import TutorNavbar from "../../Components/Navbar/TutorNavbar";
import { useParams } from "react-router-dom";

const CourseDetails = () => {
  const { courseId } = useParams();
  return (
    <div>
      <TutorNavbar />
      <AboutCourse courseId={courseId} />
      <Footer />
    </div>
  );
};

export default CourseDetails;
