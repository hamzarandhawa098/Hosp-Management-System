import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosConfig";
import userImage from "../../assets/images/userImage.png";
import BackIcon from "../../assets/icons/Back.svg";
import Loader from "./Loader";
import LoaderWhite from "../global/LoaderWhite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState(userImage);
  const [originalProfileImage, setOriginalProfileImage] = useState(userImage);
  const [name, setName] = useState("");
  const [originalName, setOriginalName] = useState("");
  const [email, setEmail] = useState("");
  const [originalEmail, setOriginalEmail] = useState("");
  const [password, setPassword] = useState("");
  const [originalPassword, setOriginalPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const [documentId, setDocumentId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();
  const db = getFirestore();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const response = await axiosInstance.get("/users");
          const users = response.data.documents;

          const matchedUser = users.find(
            (doc) => doc.fields.uid?.stringValue === user.uid
          );

          if (matchedUser) {
            const fetchedName = matchedUser.fields.name?.stringValue || "";
            const fetchedEmail = matchedUser.fields.email?.stringValue || "";
            const fetchedPassword =
              matchedUser.fields.password?.stringValue || "";

            setName(fetchedName);
            setOriginalName(fetchedName);
            setEmail(fetchedEmail);
            setOriginalEmail(fetchedEmail);
            setPassword(fetchedPassword);
            setOriginalPassword(fetchedPassword);

            setDocumentId(matchedUser.name.split("/")[6]);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (
      name !== originalName ||
      email !== originalEmail ||
      password !== originalPassword ||
      profileImage !== originalProfileImage
    ) {
      setIsChanged(true);
    } else {
      setIsChanged(false);
    }
  }, [
    name,
    email,
    password,
    profileImage,
    originalName,
    originalEmail,
    originalPassword,
    originalProfileImage,
  ]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (documentId) {
      try {
        const userRef = doc(db, "users", documentId);
        await updateDoc(userRef, {
          name,
          email,
          password,
          profileImage,
        });

        toast.success("Profile Updated Successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
      } catch (error) {
        toast.error(`Profile Update Failed: ${error.message}`, {
          position: "top-right",
          autoClose: 2000,
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center min-h-screen items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="max-w-4xl w-full rounded-lg shadow-lg bg-white mx-auto p-8">
        <div className="p-6">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 p-2 bg-blue-500 rounded-full"
          >
            <span>
              <img src={BackIcon} alt="" className="w-8 h-8" />
            </span>
          </button>

          <h2 className="text-2xl font-poppins font-bold mb-6">Edit Profile</h2>

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
                className="cursor-pointer rounded-full overflow-hidden w-24 h-24 bg-gray-200 flex items-center justify-center"
              >
                <img
                  src={profileImage}
                  alt="Profile"
                  className="object-cover"
                />
              </label>
            </div>

            <div className="mb-6">
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 px-4 py-4 rounded"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-6">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 px-4 py-4 rounded"
                placeholder="Enter your email"
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 px-4 py-4 rounded"
                placeholder="Enter your password"
              />
            </div>

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
              {isLoading ? <LoaderWhite /> : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
