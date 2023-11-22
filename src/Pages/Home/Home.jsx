import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";
import axios from "axios";
import { useSelector } from "react-redux";
axios.defaults.withCredentials = true;

const Home = () => {
  const { name, email, phone, id } = useSelector((state) => state.user);

  return (
    <>
      <UserNavbar />
      <div className="flex flex-col text-center justify-center items-center h-screen">
        <h1 className="text-3xl">Welcome Home {name}</h1>
        <h1 className="text-3xl">Welcome Home {email}</h1>
        <h1 className="text-3xl">Welcome Home {phone}</h1>
        <h1 className="text-3xl">Welcome Home {id}</h1>
      </div>
      <Footer />
    </>
  );
};

export default Home;
