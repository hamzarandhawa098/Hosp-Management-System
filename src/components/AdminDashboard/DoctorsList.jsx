import React from "react";

const DoctorsList = ({ setSelectedDoctor }) => {
  const doctors = [
    { id: 1, name: "Dr. John Doe", specialization: "Cardiologist" },
    { id: 2, name: "Dr. Jane Smith", specialization: "Dermatologist" },
    { id: 3, name: "Dr. Mark Taylor", specialization: "Neurologist" },
  ]; 

  return (
    <div className="bg-white  shadow-md rounded-lg p-6">
      <h2 className="text-lg font-semibold mb-4">Doctors List</h2>
      <ul>
        {doctors.map((doctor) => (
          <li
            key={doctor.id}
            className="flex justify-between items-center p-2 border-b border-gray-200 last:border-none"
          >
            <div>
              <p className="font-semibold">{doctor.name}</p>
              <p className="text-sm text-gray-500">{doctor.specialization}</p>
            </div>
            <button
              onClick={() => setSelectedDoctor(doctor)}
              className="bg-blue-500 text-white px-3 py-2 rounded"
            >
              View Appointments
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoctorsList;
