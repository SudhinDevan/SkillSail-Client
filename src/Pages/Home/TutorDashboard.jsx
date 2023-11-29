import TutorNavbar from "../../Components/Navbar/TutorNavbar";
import Footer from "../../Components/Navbar/Footer";
import TeacherHome from "../../Components/Teachers/TeacherHome";

const TutorDashboard = () => {

  return (
    <div className="h-screen+50 md:h-screen">
      <TutorNavbar />
      <TeacherHome />
      <Footer />
    </div>
  );
};

export default TutorDashboard;
