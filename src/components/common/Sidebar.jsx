import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import axiosInstance from "../../api/axiosConfig";
import DashboardIcon from "../../assets/icons/Dashboard.svg";
import LogoutIcon from "../../assets/icons/Logout.svg";
import LogoWhite from "../../assets/images/LogoWhite.png";
import UserImage from "../../assets/images/UserImage.png";
import LoaderWhite from "./LoaderWhite";

const Sidebar = () => {
  const history = useNavigate();
  const [userName, setUserName] = useState("John Doe");
  const [userRole, setUserRole] = useState("Admin");
  const [profileImage, setProfileImage] = useState(UserImage);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const response = await axiosInstance.get("/users");
        const users = response.data.documents;
        const user = auth.currentUser;

        if (user) {
          const matchedUser = users.find(
            (doc) => doc.fields.uid?.stringValue === user.uid
          );

          if (matchedUser) {
            setUserName(matchedUser.fields.name?.stringValue || "userName");
            setUserRole(matchedUser.fields.role?.stringValue || "Role");
            setProfileImage(
              matchedUser.fields.profileImage?.stringValue || UserImage
            );
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div className="bg-blue-500 text-white p-4 flex justify-between items-center md:hidden fixed top-0 left-0 w-full">
        <img src={LogoWhite} alt="Logo" className="w-24" />
        <button onClick={() => setIsSidebarOpen(true)}>Open</button>
      </div>

      <div
        className={`fixed  md:flex min-h-screen flex-col w-[250px] lg:w-[320px] bg-blue-500 text-white h-full p-4 ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
        {isSidebarOpen && (
          <div
            className="fixed inset-0   md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        <div className="static">
          <div className="flex justify-center items-center py-6">
            <img src={LogoWhite} alt="Logo" className="w-32" />
          </div>

          <div className=" flex flex-col space-y-4 flex-grow">
            <Link
              to="#"
              className="flex items-center space-x-4 hover:bg-blue-600 p-2 rounded"
            >
              <img src={DashboardIcon} alt="Dashboard" className="w-8 h-8" />
              <span className="text-xl font-semibold font-poppins">
                Dashboard
              </span>
            </Link>
          </div>
          <div className=" absolute  bottom-4">
            {isLoading ? (
              <LoaderWhite />
            ) : (
              <Link to="/edit-profile" className="flex items-center gap-4 mb-4">
                <img
                  src={profileImage}
                  alt="User"
                  className="w-14 h-14 rounded-full"
                />
                <div>
                  <h4 className="text-base font-semibold font-poppins">
                    {userName}
                  </h4>
                  <p className="text-sm text-gray-200">{userRole}</p>
                </div>
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-4 hover:bg-blue-600 p-2 rounded w-full text-left"
            >
              <img src={LogoutIcon} alt="Logout" className="w-8 h-8" />
              <span className="text-xl font-semibold font-poppins">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
