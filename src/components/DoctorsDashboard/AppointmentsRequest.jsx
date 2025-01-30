import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import Loader from "../global/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const auth = getAuth();
const db = getFirestore();

function AppointmentsRequest() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctorUid, setDoctorUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setDoctorUid(user.uid);
      } else {
        setError("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!doctorUid) return;

      try {
        setLoading(true);
        const response = await axiosInstance.get(`/appointments`);
        console.log("Doctor ID", doctorUid);

        const filteredAppointments = response.data.documents.filter(
          (appointment) =>
            appointment.fields.doctorUid?.stringValue === doctorUid &&
            appointment.fields.status?.stringValue === "Pending"
        );

        setAppointments(filteredAppointments || []);
      } catch (err) {
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [doctorUid]);

  const updateAppointmentStatus = async (appointmentId, status) => {
    const appointmentRef = doc(db, "appointments", appointmentId);
    try {
      await updateDoc(appointmentRef, {
        status: status,
      });
      return true;
    } catch (error) {
      console.error("Error updating appointment status: ", error);
      return false;
    }
  };

  const handleAccept = async (appointment) => {
    toast.info("Accepting appointment...", {
      position: "top-right",
      autoClose: 2000,
    });
  
    const documentId = appointment.name.split("/").pop();
    const success = await updateAppointmentStatus(documentId, "Accepted");
  
    if (success) {
      toast.success("Appointment accepted successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
  
      setAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app.name !== appointment.name)
      );
    } else {
      toast.error("Failed to accept the appointment. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  
  const handleCancel = async (appointment) => {
    toast.info("Cancelling appointment...", {
      position: "top-right",
      autoClose: 2000,
    });
  
    const documentId = appointment.name.split("/").pop();
    const success = await updateAppointmentStatus(documentId, "Cancelled");
  
    if (success) {
      toast.success("Appointment cancelled successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
  
      setAppointments((prevAppointments) =>
        prevAppointments.filter((app) => app.name !== appointment.name)
      );
    } else {
      toast.error("Failed to cancel the appointment. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  

  if (loading) return <div><Loader /></div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-white w-full rounded-lg shadow-md">
          <ToastContainer />
      <div className="px-5 py-8">
        <h1 className="text-2xl font-poppins font-semibold">Appointments Requested</h1>
      </div>

      <div className="p-5">
        {appointments.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="py-2 px-4 font-poppins border-b text-sm font-medium">Patient Name</th>
                <th className="py-2 px-4 font-poppins border-b text-sm font-medium">Appointment Time</th>
                <th className="py-2 px-4 border-b font-poppins text-sm font-medium">Appointment Date</th>
                <th className="py-2 px-4 border-b font-poppins text-sm font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 text-[16px] border-b">
                    {appointment.fields.patientName?.stringValue || ""}
                  </td>
                  <td className="py-2 px-4 text-[16px] border-b">
                    {appointment.fields.slot?.stringValue || ""}
                  </td>
                  <td className="py-2 px-4 text-[16px] border-b">
                    {appointment.fields.date?.stringValue || ""}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="px-9 py-4 text-[16px] text-white bg-green-500 rounded-lg mr-2"
                      onClick={() => handleAccept(appointment)}
                    >
                      Accept
                    </button>
                    <button
                      className="px-9 py-4 text-[16px] text-white bg-red-500 rounded-lg"
                      onClick={() => handleCancel(appointment)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No pending appointments available.</p>
        )}
      </div>
    </div>
  );
}

export default AppointmentsRequest;