import React from "react";

const DoctorAppointments = ({ doctor }) => {
  const appointments = [
    { id: 1, patient: "Alice", date: "2025-01-24", status: "Completed" },
    { id: 2, patient: "Bob", date: "2025-01-25", status: "Pending" },
    { id: 3, patient: "Charlie", date: "2025-01-26", status: "Cancelled" },
    { id: 4, patient: "Charlie", date: "2025-01-26", status: "Cancelled" },
    { id: 5, patient: "Charlie", date: "2025-01-26", status: "Cancelled" },

  ]; 

  return (
    <div className="bg-white  p-6 col-span-2">
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
                  appointment.status === "Completed"
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
