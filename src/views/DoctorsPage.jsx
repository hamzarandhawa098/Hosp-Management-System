import Sidebar from "../components/common/Sidebar";
import TopBar from "../components/DoctorsDashboard/TopBar";
import DoctorDashboardPage from "./DoctorDashboardPage";
function DoctorsPage() {
  return (
    <>
      <Sidebar />
      <div className="ml-[320px]">
        <TopBar />
        <div className="bg-[#EBEBEB] w-full min-h-screen">
          <DoctorDashboardPage />
        </div>
      </div>
    </>
  );
}

export default DoctorsPage;
