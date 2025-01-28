import Sidebar from "../components/global/Sidebar";
import TopBar from "../components/DoctorsDashboard/TopBar";
import TodayAppointment from "../components/DoctorsDashboard/TodaysAppointment";
import AppointmentsRequest from "../components/DoctorsDashboard/AppointmentsRequest";
import Availability from "../components/DoctorsDashboard/Availability";

function DoctorDashboardPage () {
  return (
   <>
   <Sidebar />
   <div className="ml-[320px]">
    <TopBar />
    <div className="bg-[#EBEBEB] flex flex-col gap-10 py-20 px-20 min-h-screen">
        <TodayAppointment />
        <AppointmentsRequest />
        <Availability />
    </div>
   </div>
   </>
  )
}

export default DoctorDashboardPage;