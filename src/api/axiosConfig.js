import axios from "axios";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: `https://firestore.googleapis.com/v1/projects/hospital-management-812b3/databases/(default)/documents`,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const navigate = useNavigate();

    if (error.response) {
      if (error.response.status === 404) {
        console.error("Resource not found: ", error.response.config.url);
        await auth.signOut();
        navigate("/login");
      }
    } else {
      if (error.message.includes("Network Error")) {
        console.error("CORS error: ", error.message);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
