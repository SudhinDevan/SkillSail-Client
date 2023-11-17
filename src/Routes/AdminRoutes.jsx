import { Route, Routes } from "react-router-dom";
import AdminSignin from "../Pages/Signin/AdminSignin";
import AdminDashboard from "../Pages/Home/AdminDashboard";
import ProtectedAdminRoutes from "../Utils/ProtectedAdminRoutes";
import AdminAuthRoute from "../Utils/AdminAuthRoute";
import UserListing from "../Pages/Listing/UserListing";
import TeacherListing from "../Pages/Listing/TeacherListing";

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
          path="/admin/teachers"
          element={
            <AdminAuthRoute>
              <TeacherListing />
            </AdminAuthRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AdminRoutes;
