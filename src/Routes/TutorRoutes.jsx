import { Route, Routes } from "react-router-dom";
import TutorDashboard from "../Pages/Home/TutorDashboard";
import TutorProfile from "../Pages/Profile/TutorProfile";
import RunningCourse from "../Pages/Course/RunningCourse";

const TutorRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/tutor/dashboard" element={<TutorDashboard />} />
        <Route path="/tutor/profile" element={<TutorProfile />} />
        <Route path="/tutor/runningCourse" element={<RunningCourse />} />
      </Routes>
    </>
  );
};

export default TutorRoutes;
