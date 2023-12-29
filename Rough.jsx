///////////////////////////////////Abu interceptor///////////////////////////////
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
    let isRefreshing = false;
    let refreshSubscribers = [];

    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers.Authorization = `Bearer ${authstate?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response && error.response.status === 401) {
          const prevRequest = error?.config;

          if (!isRefreshing) {
            isRefreshing = true;

            // Perform token refresh
            try {
              const response = await axiosPrivate.post("/refresh", {
                withCredentials: true,
              });

              const newAccessToken = response.data.accessToken;
              prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return axiosPrivate(prevRequest);
            } catch (refreshError) {
              await logout();

              return Promise.reject(refreshError);
            } finally {
              isRefreshing = false;
            }
          } else {
            return new Promise((resolve) => {
              refreshSubscribers.push((access_token) => {
                prevRequest.headers.Authorization = `Bearer ${access_token}`;
                resolve(axiosPrivate(prevRequest));
              });
            });
          }
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
