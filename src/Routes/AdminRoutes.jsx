import { Route, Routes } from "react-router-dom";
import AdminSignin from "../Pages/Signin/AdminSignin";
import AdminDashboard from "../Pages/Home/AdminDashboard";
import ProtectedAdminRoutes from "../Utils/ProtectedAdminRoutes";
import AdminAuthRoute from "../Utils/AdminAuthRoute";
import UserListing from "../Pages/Listing/UserListing";
import TeacherApprovalListing from "../Pages/Listing/TeacherApprovalListing";
import TeacherListing from "../Pages/Listing/TeacherListing";
import AdminCourseSection from "../Pages/Course/AdminCourseSection";
import TransactionHistory from "../Pages/Transactions/TransactionHistory";
import Error from "../Pages/Error/Error";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedAdminRoutes>
              <AdminSignin />
            </ProtectedAdminRoutes>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminAuthRoute>
              <AdminDashboard />
            </AdminAuthRoute>
          }
        />
        <Route
          path="/users"
          element={
            <AdminAuthRoute>
              <UserListing />
            </AdminAuthRoute>
          }
        />
        <Route
          path="/teacherRequest"
          element={
            <AdminAuthRoute>
              <TeacherApprovalListing />
            </AdminAuthRoute>
          }
        />
        <Route
          path="/teachers"
          element={
            <AdminAuthRoute>
              <TeacherListing />
            </AdminAuthRoute>
          }
        />
        <Route
          path="/courses"
          element={
            <AdminAuthRoute>
              <AdminCourseSection />
            </AdminAuthRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <AdminAuthRoute>
              <TransactionHistory />
            </AdminAuthRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
