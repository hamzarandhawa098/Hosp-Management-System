import React from "react";

const TotalDoctorsCard = () => {
  const totalDoctors = 25;

  return (
    <>
    <div className="flex max-w-4xl w-full mx-auto bg-white shadow-md rounded-lg  justify-center items-center">
      <div className=" text-center  rounded-lg p-6">
        <h2 className="text-lg font-semibold">Total Doctors</h2>
        <p className="text-4xl font-bold text-blue-500">{totalDoctors}</p>
      </div>
      </div>
    </>
  );
};

export default TotalDoctorsCard;
