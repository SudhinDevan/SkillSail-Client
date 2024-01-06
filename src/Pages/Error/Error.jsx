import { useSelector } from "react-redux";
import Logo from "../../Components/HelperComponents/Logo";
import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";
import TutorNavbar from "../../Components/Navbar/TutorNavbar";
import AdminNavbar from "../../Components/Navbar/AdminNavbar";

const Error = () => {
  const { role } = useSelector((state) => state.user);
  return (
    <>
      {role === 2000 ? (
        <UserNavbar />
      ) : role === 3000 ? (
        <TutorNavbar />
      ) : (
        <AdminNavbar />
      )}
      <div className="h-screen flex items-center justify-center flex-col">
        <Logo className="w-96 cursor-pointer" />
        <h1 className="text-6xl font-semibold pt-20 text-gray-500">
          404 Error{" "}
        </h1>
        <h1 className="text-6xl font-semibold pt-10 text-gray-500">
          Page not found
        </h1>
      </div>
      <Footer />
    </>
  );
};

export default Error;
