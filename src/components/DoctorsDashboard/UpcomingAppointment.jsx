import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getAuth, onAuthStateChanged } from "firebase/auth"; 
import Loader from "../common/Loader";

dayjs.extend(customParseFormat);

const sortAppointments = (appointments) => {
  return [...appointments].sort((a, b) => {
    const timeA = dayjs(a.slot.split(" - ")[0], "hh:mm A");
    const timeB = dayjs(b.slot.split(" - ")[0], "hh:mm A");
    return timeA.isBefore(timeB) ? -1 : 1;
  });
};

function TodayAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [doctorUid, setDoctorUid] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDoctorUid(user.uid);
      } else {
        console.error("No user logged in.");
      }
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  useEffect(() => {
    if (!doctorUid) return;

    const fetchAppointments = async () => {
      try {
        const response = await axiosInstance.get("/appointments");

        if (
          !response.data.documents ||
          !Array.isArray(response.data.documents)
        ) {
          console.error(
            "Error: Response does not contain an array of documents."
          );
          return;
        }

        const fetchedAppointments = response.data.documents.map(
          (appointment) => {
            const date = appointment.fields?.date?.stringValue || "";
            const slot = appointment.fields?.slot?.stringValue || "";
            const patientName =
              appointment.fields?.patientName?.stringValue || "Unknown";
            const status = appointment.fields?.status?.stringValue || "";
            const appointmentDoctorUid =
              appointment.fields?.doctorUid?.stringValue || "";

            return {
              id: appointment.name.split("/").pop(),
              patientName,
              date,
              slot,
              status,
              doctorUid: appointmentDoctorUid,
            };
          }
        );

        const currentDateTime = dayjs();
        const upcomingAppointments = fetchedAppointments.filter(
          (appointment) => {
            const appointmentDateTime = dayjs(
              `${appointment.date} ${appointment.slot.split(" - ")[0]}`,
              "YYYY-MM-DD hh:mm A"
            );

            return (
              appointment.status.toLowerCase() === "accepted" &&
              appointment.doctorUid === doctorUid &&
              appointmentDateTime.isAfter(currentDateTime)
            );
          }
        );

        setAppointments(upcomingAppointments);
      } catch (error) {
        console.error("Failed to fetch appointments:", error);
      }
    };

    fetchAppointments();

    const interval = setInterval(fetchAppointments, 2000);

    return () => clearInterval(interval);
  }, [doctorUid]);

  const sortedAppointments = sortAppointments(appointments);

  const displayedAppointments = showAll
    ? sortedAppointments
    : sortedAppointments.slice(0, 5);

  const handleSeeAll = () => setShowAll((prev) => !prev);

  if (loading) {
    return <Loader />
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-md">
      <div className="flex  justify-between px-6 py-4 border-b">
        <h3 className="text-xl font-semibold font-poppins">
          Upcoming Appointments
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
        {displayedAppointments.length > 0 ? (
          displayedAppointments.map((appointment) => (
            <li key={appointment.id} className="px-6 py-4">
              <div className="flex flex-col justify-between items-center">
                <h4 className="font-semibold font-poppins text-gray-800">
                  {appointment.patientName}
                </h4>
                <p className="text-gray-500 text-lg font-poppins font-medium">
                  {appointment.date}, {appointment.slot}
                </p>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500 px-6 py-4">No upcoming appointments.</p>
        )}
      </ul>
    </div>
  );
}

export default TodayAppointment;
