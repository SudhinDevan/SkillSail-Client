import { useSelector } from "react-redux";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Footer from "../../Components/Navbar/Footer";

const AdminDashboard = () => {
  const state = useSelector((state) => state.user);
  return (
    <>
      <AdminNavbar />
      <h1 className="flex items-center justify-center h-screen text-3xl">
        Welcome Admin: {state.email}
      </h1>
      <h1 className="flex items-center justify-center h-screen text-3xl">
        Welcome Admin role: {state.role}
      </h1>
      <Footer />
    </>
  );
};

export default AdminDashboard;
