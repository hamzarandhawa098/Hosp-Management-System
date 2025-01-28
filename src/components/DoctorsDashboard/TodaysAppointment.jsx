import React, { useState } from "react";

const appointments = [
  { id: 1, patient: "John Doe", time: "10:00 AM", date: "2025-01-24" },
  { id: 2, patient: "Jane Smith", time: "11:30 AM", date: "2025-01-24" },
  { id: 3, patient: "Sam Wilson", time: "02:00 PM", date: "2025-01-24" },
  { id: 4, patient: "Emily Davis", time: "03:30 PM", date: "2025-01-24" },
  { id: 5, patient: "Chris Johnson", time: "04:00 PM", date: "2025-01-24" },
  { id: 6, patient: "Anna Taylor", time: "05:00 PM", date: "2025-01-24" },
  { id: 7, patient: "James Taylor", time: "07:00 PM", date: "2025-01-24" },

];

const sortAppointments = (appointments) => {
  return [...appointments].sort((a, b) => {
    const timeA = new Date(`1970-01-01T${a.time}`);
    const timeB = new Date(`1970-01-01T${b.time}`);
    return timeA - timeB;
  });
};

function TodayAppointment() {
  const sortedAppointments = sortAppointments(appointments);

  const [showAll, setShowAll] = useState(false);

  const displayedAppointments = showAll
    ? sortedAppointments
    : sortedAppointments.slice(0, 5);

  const handleSeeAll = () => setShowAll((prev) => !prev);

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="flex justify-between px-6 py-4 border-b">
        <h3 className="text-xl font-semibold font-poppins">
          Today's Appointments
        </h3>
        {sortedAppointments.length > 5 && (
          <button
            className="font-poppins text-blue-500 text-lg font-semibold"
            onClick={handleSeeAll}
          >
            {showAll ? "Show Less" : "Show All"}
          </button>
        )}
      </div>
      <ul className="divide-y">
        {displayedAppointments.map((appointment) => (
          <li key={appointment.id} className="px-6 py-4 ">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold font-poppins text-gray-800">
                {appointment.patient}
              </h4>
              <p className="text-gray-500 text-lg font-poppins font-medium">
                {appointment.date}, {appointment.time}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodayAppointment;
