import axios from "axios";
axios.defaults.withCredentials = true;

const BASE_URL = "http://localhost:3000";

const AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default AxiosInstance;
