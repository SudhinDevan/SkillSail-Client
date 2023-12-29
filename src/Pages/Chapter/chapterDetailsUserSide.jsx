import ChapterDetailsComp from "../../Components/ChapterComp/ChapterDetailsComp";
import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";
import { useParams } from "react-router-dom";

const ChapterDetails = () => {
  const { chapterId } = useParams();
  return (
    <>
      <UserNavbar />
      <ChapterDetailsComp chapterId={chapterId} />
      <Footer />
    </>
  );
};

export default ChapterDetails;
