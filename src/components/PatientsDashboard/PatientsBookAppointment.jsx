import { useEffect, useState } from "react";
import fetchDoctors from "../../api/fetchDoctors";

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
  const slots = [
    "10:00 AM - 11:00 AM",
    "12:00 PM - 01:00 PM",
    "02:00 PM - 03:00 PM",
  ];

  useEffect(() => {
    const loadDoctors = async () => {
      try {
        const fetchedDoctors = await fetchDoctors();
        setDoctors(fetchedDoctors);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      }
    };

    loadDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Appointment Details:", formData);
    alert("Appointment Booked Successfully!");
  };
  return (
    <div className=" mx-auto px-6 py-6">
      <h1 className="text-xl font-bold text-center font-poppins mb-4">
        Book Appointment
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Patient Name"
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Age"
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              -- Select Gender --
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            id="disease"
            name="disease"
            value={formData.disease}
            onChange={handleChange}
            required
            placeholder="Disease"
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <select
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              -- Select a Doctor --
            </option>
            {doctors.map((doc) => (
              <option key={doc.id} value={doc.name}>
                {doc.name} - {doc.specialization}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            id="slot"
            name="slot"
            value={formData.slot}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          >
            <option value="" disabled>
              -- Select a Slot --
            </option>
            {slots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <input
            type="tel"
            id="contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            placeholder="Contact Number"
            required
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <textarea
            id="summary"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            required
            placeholder="Summary"
            className="w-full px-4 py-4 border border-gray-300 rounded-md"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default PatientsBookAppointment;
