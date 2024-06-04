import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:4700/api/v1" });

export default axiosInstance;
