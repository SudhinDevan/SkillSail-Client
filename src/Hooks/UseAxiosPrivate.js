import { useSelector } from "react-redux"
import UseRefreshToken from "./useRefreshToken"
import { useEffect } from "react"
import { axiosPrivate } from "../Axios/AxiosInstance"

const UseAxiosPrivate = () =>{
    const refresh = UseRefreshToken()
    const authstate = useSelector((state)=> state.user)

    useEffect(()=>{
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if(!config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${authstate?.accessToken}`
                }
                return config;
            }, (error)=> Promise.reject(error)
        )
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async(error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest)
                }
                return Promise.reject(error)
            }
        )
        return()=> {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    },[authstate, refresh])
    return axiosPrivate;
}

export default UseAxiosPrivate;