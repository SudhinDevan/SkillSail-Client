import React from "react";
import { Route, Routes } from "react-router-dom";
import TutorDashboard from "../Pages/Home/TutorDashboard";
import ProtectedTutorRoute from "../Utils/ProtectedTutorRoute";
import TutorProfile from "../Pages/Profile/TutorProfile";
import CourseDetails from "../Pages/CourseDetails/CourseDetails";
import ChapterDetails from "../Pages/Chapter/ChapterDetails";
import StudentListing from "../Pages/Listing/StudentListing";
import PublicCourses from "../Pages/Course/PublicCourse";
import Blog from "../Pages/Blog/Blog";
import BlogDetails from "../Pages/Blog/BlogDetails";
import TutorSideChat from "../Pages/Chats/TutorSideChat";
import Error from "../Pages/Error/Error";
const LazyRunningCourse = React.lazy(() =>
  import("../Pages/Course/RunningCourse")
);

const knownRoutes = ["TutorDashboard"];

const TutorRoutes = () => {
  const isUnknownRoutes = knownRoutes.find((route) =>
    window.location.href.includes(route)
  );

  return (
    <>
      <Routes>
        <Route
          path="/tutor/dashboard"
          element={
            <ProtectedTutorRoute>
              <TutorDashboard />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/tutor/profile"
          element={
            <ProtectedTutorRoute>
              <TutorProfile />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/tutor/runningCourse"
          element={
            <ProtectedTutorRoute>
              <React.Suspense fallback="Loading...">
                <LazyRunningCourse />
              </React.Suspense>
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/tutor/publicCourses"
          element={
            <ProtectedTutorRoute>
              <PublicCourses />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/tutor/courseDetails/:courseId"
          element={
            <ProtectedTutorRoute>
              <CourseDetails />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/tutor/blogDetails/:blogId"
          element={
            <ProtectedTutorRoute>
              <BlogDetails />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/tutor/chapterDetails/:chapterId"
          element={
            <ProtectedTutorRoute>
              <ChapterDetails />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/tutor/students"
          element={
            <ProtectedTutorRoute>
              <StudentListing />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/tutor/blog"
          element={
            <ProtectedTutorRoute>
              <Blog />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/tutor/chat"
          element={
            <ProtectedTutorRoute>
              <TutorSideChat />
            </ProtectedTutorRoute>
          }
        />
        {!isUnknownRoutes && <Route path="*" element={<Error />} />}
      </Routes>
    </>
  );
};

export default TutorRoutes;
