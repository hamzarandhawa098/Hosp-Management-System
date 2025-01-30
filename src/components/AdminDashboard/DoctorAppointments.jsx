import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig"; 

const DoctorAppointments = ({ doctor }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get(`/appointments`);
        const appointmentsData = response.data.documents || [];

        const doctorAppointments = appointmentsData
          .filter((doc) => doc.fields.doctorUid?.stringValue === doctor.id) 
          .map((doc) => ({
            id: doc.name.split('/').pop(), 
            patient: doc.fields.patientName.stringValue,
            date: doc.fields.date.stringValue,
            status: doc.fields.status.stringValue,
          }));

        setAppointments(doctorAppointments);
      } catch (error) {
        console.error("Error fetching appointments data:", error.message);
      }
    };

    fetchAppointments();
  }, [doctor.id]); 

  return (
    <div className="bg-white p-6 col-span-2">
      <h2 className="text-lg font-semibold mb-4">
        Appointments for {doctor.name}
      </h2>
      <table className="w-full text-left border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Patient</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="p-2 border">{appointment.patient}</td>
              <td className="p-2 border">{appointment.date}</td>
              <td
                className={`p-2 border ${
                  appointment.status === "Accepted"
                    ? "text-green-500"
                    : appointment.status === "Pending"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {appointment.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorAppointments;
