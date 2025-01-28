import React from "react";

function PreviousAppointments() {
  const appointments = [
    {
      doctor: "Dr. John Doe",
      date: "2025-01-20",
      timeSlot: "10:00 AM - 11:00 AM",
      status: "Accepted",
      department: "Cardiology",
      patientNotes: "Follow-up for chest pain",
    },
    {
      doctor: "Dr. Jane Smith",
      date: "2025-01-18",
      timeSlot: "12:00 PM - 01:00 PM",
      status: "Completed",
      department: "Dermatology",
      patientNotes: "Routine skin check",
    },
    {
      doctor: "Dr. Emily White",
      date: "2025-01-15",
      timeSlot: "02:00 PM - 03:00 PM",
      status: "Pending",
      department: "Pediatrics",
      patientNotes: "Consultation for flu symptoms",
    },
    {
      doctor: "Dr. Michael Brown",
      date: "2025-01-22",
      timeSlot: "03:00 PM - 04:00 PM",
      status: "Accepted",
      department: "Orthopedics",
      patientNotes: "Knee pain evaluation",
    },
    {
      doctor: "Dr. Laura Green",
      date: "2025-01-25",
      timeSlot: "09:00 AM - 10:00 AM",
      status: "Completed",
      department: "Neurology",
      patientNotes: "Migraine treatment review",
    },
    {
      doctor: "Dr. John Doe",
      date: "2025-01-20",
      timeSlot: "10:00 AM - 11:00 AM",
      status: "Accepted",
      department: "Cardiology",
      patientNotes: "Follow-up for chest pain",
    },
    {
      doctor: "Dr. Jane Smith",
      date: "2025-01-18",
      timeSlot: "12:00 PM - 01:00 PM",
      status: "Completed",
      department: "Dermatology",
      patientNotes: "Routine skin check",
    },
    {
      doctor: "Dr. Emily White",
      date: "2025-01-15",
      timeSlot: "02:00 PM - 03:00 PM",
      status: "Pending",
      department: "Pediatrics",
      patientNotes: "Consultation for flu symptoms",
    },
    {
      doctor: "Dr. Michael Brown",
      date: "2025-01-22",
      timeSlot: "03:00 PM - 04:00 PM",
      status: "Accepted",
      department: "Orthopedics",
      patientNotes: "Knee pain evaluation",
    },
    {
      doctor: "Dr. Laura Green",
      date: "2025-01-25",
      timeSlot: "09:00 AM - 10:00 AM",
      status: "Completed",
      department: "Neurology",
      patientNotes: "Migraine treatment review",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h1 className="text-xl font-bold mb-4">Previous Appointments</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">Doctor's Name</th>
            <th className="border border-gray-300 px-4 py-2">Date</th>
            <th className="border border-gray-300 px-4 py-2">Time Slot</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Patient Notes</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{appointment.doctor}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.date}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.timeSlot}</td>
              <td
                className={`border border-gray-300 px-4 py-2 font-semibold ${
                  appointment.status === "Accepted"
                    ? "text-green-500"
                    : appointment.status === "Pending"
                    ? "text-yellow-500"
                    : "text-blue-500"
                }`}
              >
                {appointment.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">{appointment.department}</td>
              <td className="border border-gray-300 px-4 py-2">{appointment.patientNotes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PreviousAppointments;
