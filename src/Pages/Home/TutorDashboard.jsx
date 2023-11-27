import { useSelector } from "react-redux";
import TutorNavbar from "../../Components/Navbar/TutorNavbar";
import Footer from "../../Components/Navbar/Footer";

const TutorDashboard = () => {
  const state = useSelector((state) => state.user);

  return (
    <>
      <TutorNavbar />
      <h1>Hello Teacher: {state.name}</h1>
      <Footer />
    </>
  );
};

export default TutorDashboard;
