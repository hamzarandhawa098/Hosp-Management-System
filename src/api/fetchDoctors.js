import axiosInstance from "./axiosConfig";

const fetchDoctors = async () => {
  try {
    const response = await axiosInstance.get(`/users`);
    console.log("User data retrieved successfully:", response.data);

    const userDocuments = response.data.documents || [];

    const doctorDocuments = userDocuments.filter(
      (doc) => doc.fields.role?.stringValue === "Doctor"
    );

    const doctors = doctorDocuments.map((doc) => ({
      uid: doc.fields.uid?.stringValue || "",
      name: doc.fields.name?.stringValue || "",
      specialization: doc.fields.specialization?.stringValue || "",
      email: doc.fields.email?.stringValue || "",
      role: doc.fields.role?.stringValue || "",
    }));
    console.log("Doctors fetched successfully:", doctors);
    return doctors;
  } catch (error) {
    console.error(
      "Error fetching doctors:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default fetchDoctors;
