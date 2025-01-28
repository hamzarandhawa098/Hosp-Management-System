import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import HomePage from "../views/HomePage";
import LoginPage from "../views/LoginPage";
import DoctorsSignupPage from "../views/DoctorsSignupPage";
import PatientsSignupPage from "../views/PatientsSignupPage";
import DoctorDashboardPage from "../views/DoctorDashboardPage";
import PatientsDashboardPage from "../views/PatientsDashboardPage";
import AdminDashboardPage from "../views/AdminDashboardPage";


const routes = () => {
    return (
      <>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/doctor/register" element={<DoctorsSignupPage />} />
        <Route path="/patient/register" element={<PatientsSignupPage />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboardPage />} />
        <Route path="/patient/dashboard" element={<PatientsDashboardPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

        </Routes>
        </>
    );

}

export default routes;