import DisplayCoursesUserSide from "../../Components/Courses/DisplayCoursesUserSide";
import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";

const DisplayCourses = () => {
    return(
        <>
            <UserNavbar/>
            <DisplayCoursesUserSide/>
            <Footer/>
        </>
    )
}

export default DisplayCourses;