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
import Error from "../Pages/Error/Error";
import TutorSideChat from "../Pages/Chats/TutorSideChat";
const LazyRunningCourse = React.lazy(() =>
  import("../Pages/Course/RunningCourse")
);

const TutorRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedTutorRoute>
              <TutorDashboard />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedTutorRoute>
              <TutorProfile />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/runningCourse"
          element={
            <ProtectedTutorRoute>
              <React.Suspense fallback="Loading...">
                <LazyRunningCourse />
              </React.Suspense>
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/publicCourses"
          element={
            <ProtectedTutorRoute>
              <PublicCourses />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/courseDetails/:courseId"
          element={
            <ProtectedTutorRoute>
              <CourseDetails />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/blogDetails/:blogId"
          element={
            <ProtectedTutorRoute>
              <BlogDetails />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/chapterDetails/:chapterId"
          element={
            <ProtectedTutorRoute>
              <ChapterDetails />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedTutorRoute>
              <StudentListing />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedTutorRoute>
              <Blog />
            </ProtectedTutorRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedTutorRoute>
              <TutorSideChat />
            </ProtectedTutorRoute>
          }
        />
        <Route path="/*" element={<Error />} />
      </Routes>
    </>
  );
};

export default TutorRoutes;
