import AdminNavbar from "../../Components/Navbar/AdminNavbar";
import Footer from "../../Components/Navbar/Footer";

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar />
      <h1 className="flex items-center justify-center h-screen text-3xl">Welcome Admin</h1>
      <Footer />
    </>
  );
};

export default AdminDashboard;
