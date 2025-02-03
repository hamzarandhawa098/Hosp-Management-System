import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserProfile,
  updateUserProfile,
  setProfileImage,
  resetUpdateStatus,
} from "../../redux/profileSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./Loader";
import LoaderWhite from "../common/LoaderWhite";
import Sidebar from "./Sidebar";

const EditProfile = () => {
  const dispatch = useDispatch();
  const {
    name,
    email,
    password,
    profileImage,
    documentId,
    loading,
    isUpdated,
    error,
  } = useSelector((state) => state.profile);

  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const [newPassword, setNewPassword] = useState(password);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    setNewName(name);
    setNewEmail(email);
    setNewPassword(password);
  }, [name, email, password]);

  useEffect(() => {
    if (
      newName !== name ||
      newEmail !== email ||
      newPassword !== password ||
      profileImage !== ""
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [newName, newEmail, newPassword, profileImage, name, email, password]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        dispatch(setProfileImage(reader.result));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (documentId) {
      dispatch(
        updateUserProfile({
          documentId,
          name: newName,
          email: newEmail,
          password: newPassword,
          profileImage,
        })
      );
    }
  };
  useEffect(() => {
    const hasChanged =
      name !== name ||
      email !== email ||
      password !== password ||
      profileImage !== profileImage;

    setIsChanged(hasChanged);
  }, [
    name,
    email,
    password,
    profileImage,
    name,
    email,
    password,
    profileImage,
  ]);

  useEffect(() => {
    if (isUpdated) {
      toast.success("Profile Updated Successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      dispatch(resetUpdateStatus());
    }
  }, [isUpdated, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
        <ToastContainer />
        <div className="max-w-4xl lg:ml-[320px] mt-20 lg:mt-0 w-full rounded-lg shadow-lg bg-white p-8">
          <h2 className="text-2xl text-center font-bold mb-6">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex items-center justify-center">
              <input
                type="file"
                id="profile-image"
                onChange={handleImageChange}
                className="hidden"
              />
              <label
                htmlFor="profile-image"
                className="cursor-pointer w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="object-cover"
                />
              </label>
            </div>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-4 mb-6 border rounded"
              placeholder="Name"
            />
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="w-full px-4 py-4 mb-6 border rounded"
              placeholder="Email"
            />
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-4 mb-6 border rounded"
              placeholder="Password"
            />
            <button
              type="submit"
              disabled={!isChanged}
              className={`w-full font-poppins font-bold py-4 px-4 rounded-lg transition 
                ${
                  isChanged
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              {loading ? <LoaderWhite /> : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
