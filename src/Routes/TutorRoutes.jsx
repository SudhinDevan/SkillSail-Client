import { Route, Routes } from "react-router-dom";
import TutorDashboard from "../Pages/Home/TutorDashboard";
import TutorProfile from "../Pages/Profile/TutorProfile";
import RunningCourse from "../Pages/Course/RunningCourse";
import CourseDetails from "../Pages/CourseDetails/CourseDetails";
import ChapterDetails from "../Pages/Chapter/ChapterDetails";
import StudentListing from "../Pages/Listing/StudentListing";
import Blog from "../Pages/Blog/Blog";

const TutorRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/tutor/dashboard" element={<TutorDashboard />} />
        <Route path="/tutor/profile" element={<TutorProfile />} />
        <Route path="/tutor/runningCourse" element={<RunningCourse />} />
        <Route
          path="/tutor/courseDetails/:courseId"
          element={<CourseDetails />}
        />
        <Route
          path="/tutor/chapterDetails/:chapterId"
          element={<ChapterDetails />}
        />
        <Route path="/tutor/students" element={<StudentListing />} />
        <Route path="/tutor/blog" element={<Blog />} />
      </Routes>
    </>
  );
};

export default TutorRoutes;
