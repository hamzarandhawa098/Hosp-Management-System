import { useEffect, useState } from "react";
import fetchDoctors from "../../api/fetchDoctors";
import axiosInstance from "../../api/axiosConfig"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { v4 as uuidv4 } from "uuid"; 

const auth = getAuth();

function PatientsBookAppointment() {
  const [formData, setFormData] = useState({ 
    name: "", 
    age: "",        
    gender: "", 
    disease: "",
    doctor: "",
    slot: "",
    date: "",
    contact: "",
    summary: "", 
  });

  const [doctors, setDoctors] = useState([]);
  const [doctorUid, setDoctorUid] = useState(""); 
  const [patientUid, setPatientUid] = useState(""); 
  const [loading, setLoading] = useState(true); 

  const slots = [
    "10:00 AM - 11:00 AM",
    "12:00 PM - 01:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setPatientUid(user.uid);
      } else {
        setPatientUid(""); 
      }
    });

    const loadDoctors = async () => {
      try {
        setLoading(true);
        const fetchedDoctors = await fetchDoctors();
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();

    return () => unsubscribe(); 
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "doctor") {
      const selectedDoctor = doctors.find((doc) => doc.name === value);
      setDoctorUid(selectedDoctor?.uid || ""); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!patientUid) {
      alert("Please log in before booking an appointment.");
      return;
    }

    const currentDateTime = new Date();
    const [startTime] = formData.slot.split(" - ");

    const convertTo24Hour = (time) => {
      const [hourMin, period] = time.split(" ");
      let [hour, minute] = hourMin.split(":");

      hour = parseInt(hour, 10);
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      return new Date(`${formData.date}T${hour}:${minute}:00`);
    };

    const selectedDateTime = convertTo24Hour(startTime);

    if (selectedDateTime <= currentDateTime) {
      alert("Please select a future date and time.");
      return;
    }

    const appointmentId = uuidv4();

    const appointmentData = {
      fields: {
        appointmentId: { stringValue: appointmentId },
        patientUid: { stringValue: patientUid },
        patientName: { stringValue: formData.name },
        age: { integerValue: formData.age },
        gender: { stringValue: formData.gender },
        doctorName: { stringValue: formData.doctor },
        doctorSpecialization: { stringValue: doctors.find((doc) => doc.uid === doctorUid)?.specialization || "" },
        disease: { stringValue: formData.disease },
        doctorUid: { stringValue: doctorUid },
        slot: { stringValue: formData.slot },
        date: { stringValue: formData.date },
        contact: { stringValue: formData.contact },
        summary: { stringValue: formData.summary },
        status: { stringValue: "Pending" },
      },
    };

    try {
      await axiosInstance.post(`/appointments`, appointmentData);
      alert("Appointment Booked Successfully!");
      setFormData({
        name: "",
        age: "",
        gender: "",
        disease: "",
        doctor: "",
        slot: "",
        date: "", 
        contact: "",
        summary: "",
      });
    } catch (error) {
      console.error("Failed to book appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="mx-auto px-6 py-6">
      <h1 className="text-xl font-bold text-center font-poppins mb-4">
        Book Appointment
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading doctors...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Patient Name"
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          />

          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          />

          <select 
            name="gender" 
            value={formData.gender} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            placeholder="Disease"
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          />

          <select 
            name="doctor" 
            value={formData.doctor} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          >
            <option value="">-- Select a Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc.uid} value={doc.name}>
                {doc.name} - {doc.specialization}
              </option>
            ))}
          </select>

          <select 
            name="slot" 
            value={formData.slot} 
            onChange={handleChange} 
            required 
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          >
            <option value="">-- Select a Slot --</option>
            {slots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          />

          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          />

          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Write a short summary of your health issue..."
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          />

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-4 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Book Appointment
          </button>
        </form>
      )}
    </div>
  );
}

export default PatientsBookAppointment;
