import React, { useState } from "react";
import Sidebar from "../components/global/Sidebar";
import TotalDoctorsCard from "../components/AdminDashboard/TotalDoctorsCard";
import DoctorsList from "../components/AdminDashboard/DoctorsList";
import DoctorAppointments from "../components/AdminDashboard/DoctorAppointments";
import Modal from "../components/global/Modal";

const Dashboard = () => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleCloseModal = () => setSelectedDoctor(null);

  return (
    <>
      <div>
        <Sidebar />
      </div>
      <div className="ml-[320px] p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Hospital Admin Dashboard</h1>
        <TotalDoctorsCard />
        <div className="max-w-4xl mx-auto mt-12">
          <DoctorsList setSelectedDoctor={setSelectedDoctor} />
          {selectedDoctor && (
            <Modal onClose={handleCloseModal}>
              <DoctorAppointments doctor={selectedDoctor} />
            </Modal>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
