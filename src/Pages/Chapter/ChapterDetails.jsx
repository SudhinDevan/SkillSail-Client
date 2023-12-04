import ChapterDetailsComp from "../../Components/ChapterComp/ChapterDetailsComp";
import Footer from "../../Components/Navbar/Footer";
import TutorNavbar from "../../Components/Navbar/TutorNavbar";
import { useParams } from "react-router-dom";

const ChapterDetails = () => {
  const { chapterId } = useParams();
  return (
    <>
      <TutorNavbar />
      <ChapterDetailsComp chapterId={chapterId} />
      <Footer />
    </>
  );
};

export default ChapterDetails;
