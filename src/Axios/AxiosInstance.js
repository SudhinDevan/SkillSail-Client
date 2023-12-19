import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:3000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true
});

export default AxiosInstance;
