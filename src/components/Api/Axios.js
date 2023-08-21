import axios from "axios";

const AxiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://humpty-dumb-tees.onrender.com/",
  timeout: 50000,
});

export default AxiosInstance;