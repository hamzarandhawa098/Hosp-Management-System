import { useState } from "react";

function Availability() {
  const generateTimeSlots = (start, end, sessionDuration) => {
    const slots = [];
    let currentTime = start;

    while (currentTime < end) {
      const nextTime = new Date(currentTime.getTime() + sessionDuration * 60 * 60 * 1000);
      slots.push({
        time: `${formatTime(currentTime)} - ${formatTime(nextTime)}`,
        isBusy: false,
      });
      currentTime = nextTime;
    }

    return slots;
  };

  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12; 
    return `${formattedHours}:${minutes === 0 ? "00" : minutes} ${ampm}`;
  };

  const start = new Date();
  start.setHours(11, 0, 0); 
  const end = new Date();
  end.setHours(20, 0, 0); 
  const [timeSlots, setTimeSlots] = useState(generateTimeSlots(start, end, 1.5));

  const handleSlotClick = (index) => {
    setTimeSlots((prevSlots) =>
      prevSlots.map((slot, i) =>
        i === index ? { ...slot, isBusy: !slot.isBusy } : slot
      )
    );
  };

  return (
    <>
      <div className="bg-white w-full shadow-md rounded-lg">
        <div className="flex px-6 py-4">
          <h1 className="font-poppins text-2xl font-bold">Availability</h1>
        </div>
        <div className="px-6 pb-4 grid grid-cols-3 gap-4">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className={`px-4 py-4 border rounded-lg text-center cursor-pointer ${
                slot.isBusy ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => handleSlotClick(index)}
            >
              {slot.time}
              {slot.isBusy && <p className="mt-1 text-sm font-semibold">Busy</p>}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Availability;
