import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";
import { useSelector } from "react-redux";

const Home = () => {
  // const { name, email, phone, id } = useSelector((state) => state.user || {});
  const state = useSelector((state) => state.user);

  return (
    <>
      <UserNavbar />
      <div className="flex flex-col text-center justify-center items-center h-screen">
        <h1 className="text-3xl">Welcome Home {state.name}</h1>
        <h1 className="text-3xl">Welcome Home {state.email}</h1>
        <h1 className="text-3xl">Welcome Home {state.phone}</h1>
        <h1 className="text-3xl">Welcome Home {state.id}</h1>
      </div>
      <Footer />
    </>
  );
};

export default Home;
