import AxiosInstance from "../Axios/AxiosInstance.js";
import { useDispatch } from "react-redux";
import { updateToken } from "../Redux/userSlice.jsx";

function UseRefreshToken() {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await AxiosInstance.get("/refresh", {
      withCredentials: true,
    });

    dispatch(updateToken({ accessToken: response.data.accessToken }));

    return response.data.accessToken;
  };
  return refresh;
}

export default UseRefreshToken;
