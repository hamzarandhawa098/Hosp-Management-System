import React from 'react';
import { Link } from 'react-router-dom';
import DashboardIcon from '../../assets/icons/Dashboard.svg';
import LogoutIcon from '../../assets/icons/Logout.svg';
import LogoWhite from '../../assets/images/LogoWhite.png';
import UserImage from '../../assets/images/UserImage.jpg'; 

const Sidebar = () => {
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

      <div className="flex items-center justify-start gap-4 mb-4  w-full">
        <img
          src={UserImage}
          alt="User"
          className="w-14 h-14 rounded-full"
        />
        <div className='flex-col justify-center flex'>
          <h4 className="text-base font-semibold font-poppins">John Doe</h4>
          <p className="text-sm font-poppins text-gray-200">Admin</p>
        </div>
      </div>

      <Link
        to="#"
        className="flex items-center space-x-4 hover:bg-blue-600 p-2 rounded"
      >
        <img src={LogoutIcon} alt="Logout" className="w-8 h-8" />
        <span className="text-xl font-semibold font-poppins">Logout</span>
      </Link>
    </div>
  );
};

export default Sidebar;
