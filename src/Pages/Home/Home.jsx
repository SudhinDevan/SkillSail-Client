import { useEffect, useState } from "react";
import Footer from "../../Components/Navbar/Footer";
import UserNavbar from "../../Components/Navbar/UserNavbar";
import axios from "axios";
axios.defaults.withCredentials = true;
let firstRender = true;

const Home = () => {
  const [user, setUser] = useState();

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:3000/user", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const refreshToken = async () => {
    const res = await axios
      .get("http://localhost:3000/refreshToken", {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };

  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sendRequest().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data.user));
    }, 1000 * 28);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <UserNavbar />
      {user && (
        <h1 className="flex justify-center items-center text-3xl">
          Welcome Home {user.name}
        </h1>
      )}

      <Footer />
    </>
  );
};

export default Home;
