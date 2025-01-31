import Sidebar from "../components/common/Sidebar";
import TopBar from "../components/DoctorsDashboard/TopBar";
import UpcomingAppointment from "../components/DoctorsDashboard/UpcomingAppointment"
import AppointmentsRequest from "../components/DoctorsDashboard/AppointmentsRequest";
import Availability from "../components/DoctorsDashboard/Availability";

function DoctorDashboardPage () {
  return (
   <>
   <Sidebar />
   <div className="lg:ml-[320px]">
    <TopBar />
    <div className="bg-[#EBEBEB] flex flex-col gap-10 py-20 px-4 lg:px-20 min-h-screen">
        <UpcomingAppointment />
        <AppointmentsRequest />
    </div>
   </div>
   </>
  )
}

export default DoctorDashboardPage;