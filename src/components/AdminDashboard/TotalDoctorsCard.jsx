import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosConfig";
import Loader from "../common/Loader";

const TotalDoctorsCard = () => {
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchDoctorsCount = async () => {
      setIsLoading(true)
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
      finally{
        setIsLoading(false)
      }
    };

    fetchDoctorsCount();
  }, []);


  return (
    <div className="flex max-w-4xl w-full mx-auto bg-white shadow-md rounded-lg justify-center items-center">
      <div className="text-center rounded-lg p-6">
        <h2 className="text-lg font-semibold">Total Doctors</h2>
        {
          isLoading ? <Loader /> :<p className="text-4xl font-bold text-blue-500">{totalDoctors}</p>
        }
        

      </div>
    </div>
  );
};

export default TotalDoctorsCard;
