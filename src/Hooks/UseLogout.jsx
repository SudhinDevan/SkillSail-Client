import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userLogout } from "../Redux/userSlice";
import axios from "../Axios/AxiosInstance";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.get("/logout");
      dispatch(userLogout());
      navigate("/login");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };
  return logout;
};

export default useLogout;
