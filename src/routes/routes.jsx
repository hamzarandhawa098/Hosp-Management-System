import { Routes, Route } from "react-router-dom";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import DoctorsSignupPage from "../views/DoctorsSignupPage";
import PatientsSignupPage from "../views/PatientsSignupPage";
import DoctorDashboardPage from "../views/DoctorDashboardPage";
import PatientsDashboardPage from "../views/PatientsDashboardPage";
import AdminDashboardPage from "../views/AdminDashboardPage";
import EditProfile from "../components/common/EditProfile";

import PrivateRoute from "./PrivateRoute"; 

const routes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/doctor/register" element={<DoctorsSignupPage />} />
        <Route path="/patient/register" element={<PatientsSignupPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        <Route
          path="/doctor/dashboard"
          element={<PrivateRoute element={<DoctorDashboardPage />} requiredRole="Doctor" />}
        />
        <Route
          path="/patient/dashboard"
          element={<PrivateRoute element={<PatientsDashboardPage />} requiredRole="Patient" />}
        />
        <Route
          path="/admin/dashboard"
          element={<PrivateRoute element={<AdminDashboardPage />} requiredRole="Admin" />}
        />
      </Routes>
    </>
  );
};

export default routes;
