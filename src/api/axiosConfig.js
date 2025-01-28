import axios from "axios";
import { auth } from "../firebase/firebaseConfig";

const axiosInstance = axios.create({
  baseURL: `https://firestore.googleapis.com/v1/projects/hospital-management-syst-23152/databases/(default)/documents`,
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

export default axiosInstance;
