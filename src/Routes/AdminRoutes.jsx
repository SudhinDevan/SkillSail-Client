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
// import Error from "../Pages/Error/Error";

const AdminRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/admin/login"
          element={
            <ProtectedAdminRoutes>
              <AdminSignin />
            </ProtectedAdminRoutes>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminAuthRoute>
              <AdminDashboard />
            </AdminAuthRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminAuthRoute>
              <UserListing />
            </AdminAuthRoute>
          }
        />
        <Route
          path="/admin/teacherRequest"
          element={
            <AdminAuthRoute>
              <TeacherApprovalListing />
            </AdminAuthRoute>
          }
        />
        <Route
          path="/admin/teachers"
          element={
            <AdminAuthRoute>
              <TeacherListing />
            </AdminAuthRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <AdminAuthRoute>
              <AdminCourseSection />
            </AdminAuthRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <AdminAuthRoute>
              <TransactionHistory />
            </AdminAuthRoute>
          }
        />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </>
  );
};

export default AdminRoutes;
