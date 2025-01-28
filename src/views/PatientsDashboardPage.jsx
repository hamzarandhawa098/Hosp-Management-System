import { useState } from "react";
import Sidebar from "../components/global/Sidebar";
import PatientsBookAppointment from "../components/PatientsDashboard/PatientsBookAppointment";
import PreviousAppointments from "../components/PatientsDashboard/PreviousAppointments";

function PatientsDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Sidebar />
      <div className="ml-[320px] bg-[#EBEBEB] min-h-screen p-10 gap-6">
        <div className="flex justify-end px-12 ">
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Book Appointment
        </button>
        </div>
        <div className="mt-12">
        <PreviousAppointments />
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeModal}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <PatientsBookAppointment />
          </div>
        </div>
      )}
    </>
  );
}

export default PatientsDashboardPage;
