import React, { useState, useEffect } from "react";
import axiosInstance from "../../api/axiosConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();

function PreviousAppointments() {
  const [appointments, setAppointments] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientId, setPatientId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPatientId(user.uid);
        console.log("Patient ID from Firebase:", user.uid);
      } else {
        setError("No user is logged in.");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        if (!patientId) return;

        setLoading(true);

        const response = await axiosInstance.get(`/appointments`);
        
        const filteredAppointments = response.data.documents.filter(appointment =>
          appointment.fields.patientUid?.stringValue === patientId
        );

        setAppointments(filteredAppointments || []);
        console.log("Filtered Appointments:", filteredAppointments);
      } catch (err) {
        setError("No Appointments Available");
      } finally {
        setLoading(false);
      }
    }; 

    fetchAppointments();
  }, [patientId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (appointments.length === 0) {
    return (
      <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-xl font-bold mb-4">Previous Appointments</h1>
        <p className="text-gray-500">You have no previous appointments.</p>
      </div>
    );
  }

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
          {appointments.map((appointment, index) => {
            const doctor = appointment.fields.doctorName?.stringValue || "";
            const date = appointment.fields.date?.stringValue || "";
            const timeSlot = appointment.fields.slot?.stringValue || "";     
            const status = appointment.fields.status?.stringValue || "";    
            const department = appointment.fields.doctorSpecialization?.stringValue || "";
            const patientNotes = appointment.fields.summary?.stringValue || "";

            return (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{doctor}</td> 
                <td className="border border-gray-300 px-4 py-2">{date}</td>
                <td className="border border-gray-300 px-4 py-2">{timeSlot}</td>
                <td
                  className={`border border-gray-300 px-4 py-2 font-semibold ${
                    status === "Accepted"
                      ? "text-green-500"
                      : status === "Pending"
                      ? "text-yellow-500"
                      : "text-blue-500"
                  }`}
                >
                  {status}
                </td>
                <td className="border border-gray-300 px-4 py-2">{department}</td>
                <td className="border border-gray-300 px-4 py-2">{patientNotes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>      
  );
}

export default PreviousAppointments;
