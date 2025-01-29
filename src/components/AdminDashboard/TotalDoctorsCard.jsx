import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";

const TotalDoctorsCard = () => {
  const [totalDoctors, setTotalDoctors] = useState(0);

  useEffect(() => {
    const fetchDoctorsCount = async () => {
      try {
        const response = await axiosInstance.get(`/users`);
        const userDocuments = response.data.documents || [];

        const doctors = userDocuments.filter(
          (doc) => doc.fields.role?.stringValue === "Doctor"
        );

        setTotalDoctors(doctors.length);
      } catch (error) {
        console.error("Error fetching doctors data:", error.message);
      }
    };

    fetchDoctorsCount();
  }, []);

  return (
    <div className="flex max-w-4xl w-full mx-auto bg-white shadow-md rounded-lg justify-center items-center">
      <div className="text-center rounded-lg p-6">
        <h2 className="text-lg font-semibold">Total Doctors</h2>
        <p className="text-4xl font-bold text-blue-500">{totalDoctors}</p>
      </div>
    </div>
  );
};

export default TotalDoctorsCard;
