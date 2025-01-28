import React, { useState } from "react";

const initialAppointments = [
  {
    id: 1,
    patient: "John Doe",
    time: "10:00 AM",
    date: "2025-01-24",
    status: "requested",
  },
  {
    id: 2,
    patient: "Jane Smith",
    time: "11:30 AM",
    date: "2025-01-24",
    status: "requested",
  },
  {
    id: 3,
    patient: "Sam Wilson",
    time: "02:00 PM",
    date: "2025-01-24",
    status: "completed",
  },
  {
    id: 4,
    patient: "Jane Smith",
    time: "11:30 AM",
    date: "2025-01-24",
    status: "requested",
  },
  {
    id: 5,
    patient: "Sam Wilson",
    time: "02:00 PM",
    date: "2025-01-24",
    status: "completed",
  },
];

function AppointmentsRequest() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [activeTab, setActiveTab] = useState("requested");

  const filteredAppointments = appointments.filter(
    (appointment) => appointment.status === activeTab
  );

  const handleAccept = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "completed" }
          : appointment
      )
    );
  };

  const handleCancel = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className="bg-white w-full rounded-lg shadow-md">
      <div className="px-5 py-8">
        <h1 className="text-2xl font-poppins font-semibold">Appointments</h1>
      </div>

      <div className="flex px-5 border-b border-gray-200">
        <button
          className={`px-4 text-[18px] font-bold py-2 font-poppins ${
            activeTab === "requested"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("requested")}
        >
          Appointments Requested
        </button>
        <button
          className={`px-4 py-2 text-[18px] font-bold font-poppins ${
            activeTab === "completed"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Appointments Completed
        </button>
      </div>

      <div className="p-5">
        {filteredAppointments.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 font-poppins border-b text-sm font-medium">
                  Patient Name
                </th>
                <th className="py-2 px-4 font-poppins border-b text-sm font-medium">
                  Appointment Time
                </th>
                <th className="py-2 px-4 border-b font-poppins  text-sm font-medium">
                  Appointment Date
                </th>
                {activeTab === "requested" && (
                  <th className="py-2 px-4 border-b font-poppins text-sm font-medium">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td className="py-2 px-4 text-[16px] border-b">
                    {appointment.patient}
                  </td>
                  <td className="py-2 px-4 text-[16px] border-b">
                    {appointment.time}
                  </td>
                  <td className="py-2 px-4 text-[16px] border-b">
                    {appointment.date}
                  </td>
                  {activeTab === "requested" && (
                    <td className="py-2 px-4 border-b">
                      <button
                        className="px-9 py-4 text-[16px] text-white bg-green-500 rounded-lg mr-2"
                        onClick={() => handleAccept(appointment.id)}
                      >
                        Accept
                      </button>
                      <button
                        className="px-9 py-4 text-[16px] text-white bg-red-500 rounded-lg"
                        onClick={() => handleCancel(appointment.id)}
                      >
                        Cancel
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No appointments available.</p>
        )}
      </div>
    </div>
  );
}

export default AppointmentsRequest;
