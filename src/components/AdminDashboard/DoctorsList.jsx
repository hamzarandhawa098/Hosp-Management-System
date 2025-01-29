import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig"; 

const DoctorsList = ({ setSelectedDoctor }) => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axiosInstance.get(`/users`);
        const userDocuments = response.data.documents || [];

        const doctorList = userDocuments
          .filter((doc) => doc.fields.role?.stringValue === "Doctor")
          .map((doc) => ({
            id: doc.fields.uid.stringValue,
            name: doc.fields.name.stringValue,
            specialization: doc.fields.specialization?.stringValue || "Not specified",
          }));

        setDoctors(doctorList);
      } catch (error) {
        console.error("Error fetching doctors data:", error.message);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
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
