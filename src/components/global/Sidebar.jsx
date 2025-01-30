import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import axiosInstance from '../../api/axiosConfig'; 
import DashboardIcon from '../../assets/icons/Dashboard.svg';
import LogoutIcon from '../../assets/icons/Logout.svg';
import LogoWhite from '../../assets/images/LogoWhite.png';
import UserImage from '../../assets/images/UserImage.png';

const Sidebar = () => {
  const history = useNavigate();
  const [userName, setUserName] = useState('John Doe');
  const [userRole, setUserRole] = useState('Admin');
  const [profileImage, setProfileImage] = useState(UserImage);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get("/users");
        const users = response.data.documents;

        const user = auth.currentUser;

        if (user) {
          const matchedUser = users.find(
            (doc) => doc.fields.uid?.stringValue === user.uid
          );

          if (matchedUser) {
            const fetchedName = matchedUser.fields.name?.stringValue || "userName";
            const fetchedRole = matchedUser.fields.role?.stringValue || "Role";
            const fetchedProfileImage = matchedUser.fields.profileImage?.stringValue || UserImage;

            setUserName(fetchedName);
            setUserRole(fetchedRole);
            setProfileImage(fetchedProfileImage);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []); 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      history.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col w-[320px] fixed bg-blue-500 text-white h-full p-4">
      <div className="flex items-center mb-8">
        <div className="flex justify-center items-center w-full py-4">
          <img src={LogoWhite} alt="Logo" className="w-1/2" />
        </div>
      </div>

      <div className="flex flex-col space-y-4 flex-grow">
        <Link
          to="#"
          className="flex items-center space-x-4 hover:bg-blue-600 p-2 rounded"
        >
          <img src={DashboardIcon} alt="Dashboard" className="w-8 h-8" />
          <span className="text-xl font-semibold font-poppins">Dashboard</span>
        </Link>
      </div>

      <Link to="/edit-profile" className="flex items-center justify-start gap-4 mb-4 w-full">
        <img
          src={profileImage}
          alt="User"
          className="w-14 h-14 rounded-full"
        />
        <div className='flex-col justify-center flex'>
          <h4 className="text-base font-semibold font-poppins">{userName}</h4>
          <p className="text-sm font-poppins text-gray-200">{userRole}</p>
        </div>
      </Link>

      <button
        onClick={handleLogout}
        className="flex items-center space-x-4 hover:bg-blue-600 p-2 rounded w-full text-left"
      >
        <img src={LogoutIcon} alt="Logout" className="w-8 h-8" />
        <span className="text-xl font-semibold font-poppins">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;
