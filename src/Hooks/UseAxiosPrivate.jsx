import { useSelector } from "react-redux";
import UseRefreshToken from "./UseRefreshToken";
import { useEffect } from "react";
import { axiosPrivate } from "../Axios/AxiosInstance";
import useLogout from "./UseLogout";

const UseAxiosPrivate = () => {
  const logout = useLogout();
  const refresh = UseRefreshToken();
  const authstate = useSelector((state) => state.user);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${authstate?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && error?.response?.data?.access) {
          await logout();
          return;
        }

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authstate, refresh]);
  return axiosPrivate;
};

export default UseAxiosPrivate;
