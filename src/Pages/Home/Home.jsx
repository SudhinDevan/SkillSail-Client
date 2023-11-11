import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";
import axios from "axios";
import { useSelector } from "react-redux";
axios.defaults.withCredentials = true;

const Home = () => {
  const { name, email, id } = useSelector((state) => state);

  return (
    <>
      <UserNavbar />
      <h1 className="flex justify-center items-center text-3xl">
        Welcome Home {name}
      </h1>
      <h1 className="flex justify-center items-center text-3xl">
        Welcome Home {email}
      </h1>
      <h1 className="flex justify-center items-center text-3xl">
        Welcome Home {id}
      </h1>

      <Footer />
    </>
  );
};

export default Home;
