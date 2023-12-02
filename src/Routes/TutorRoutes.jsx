import { Route, Routes } from "react-router-dom";
import TutorDashboard from "../Pages/Home/TutorDashboard";
import TutorProfile from "../Pages/Profile/TutorProfile";
import RunningCourse from "../Pages/Course/RunningCourse";
import CourseDetails from "../Pages/CourseDetails/CourseDetails";

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
      </Routes>
    </>
  );
};

export default TutorRoutes;
