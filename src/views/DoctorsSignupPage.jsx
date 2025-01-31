import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoLarge from "../assets/images/Logo.png";
import signupUser from "../api/signUpDoctor";
import Loader from "../components/common/LoaderWhite";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    fullname: "",
    password: "",
    repassword: "",
    address: "",
    gender: "",
    contact: "",
    specialization: "",
    cnic: "",
    experience: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    fullname: "",
    password: "",
    repassword: "",
    address: "",
    gender: "",
    contact: "",
    specialization: "",
    cnic: "",
    experience: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [repasswordVisible, setRepasswordVisible] = useState(false);

  const placeholders = {
    email: "Email",
    fullname: "Full Name",
    password: "Password",
    repassword: "Reenter Password",
    address: "Address",
    contact: "Contact Number",
    specialization: "Specialization",
    cnic: "CNIC",
    experience: "Experience (in years)",
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleRePasswordVisibility = () => {
    setRepasswordVisible(!repasswordVisible);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
      isValid = false;
    }

    if (!form.fullname.trim()) {
      newErrors.fullname = "Full name is required.";
      isValid = false;
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required.";
      isValid = false;
    }

    if (!form.gender.trim()) {
      newErrors.gender = "Gender is required.";
      isValid = false;
    }

    if (!form.contact.trim()) {
      newErrors.contact = "Contact is required.";
      isValid = false;
    }

    if (!form.specialization.trim()) {
      newErrors.specialization = "Specialization is required.";
      isValid = false;
    }

    if (!form.cnic.trim()) {
      newErrors.cnic = "CNIC is required.";
      isValid = false;
    }

    if (!form.experience.trim()) {
      newErrors.experience = "Experience is required.";
      isValid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
      isValid = false;
    }

    if (form.password.trim() && form.password !== form.repassword.trim()) {
      newErrors.repassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await signupUser(
          form.email,
          form.password,
          form.fullname,
          form.contact,
          form.address,
          form.gender,
          form.specialization,
          form.cnic,
          form.experience
        );
        toast.success("Sign Up Successful!", {
          position: "top-right",
          autoClose: 2000,
        });
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        toast.error(`Signup failed: ${error.message}`, {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="flex flex-col py-[92px] items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-[600px] bg-white">
        <div className="text-center mb-6">
          <img
            src={LogoLarge}
            alt="logo"
            className="mx-auto h-8 w-[147px] mb-4"
          />
          <div className="mt-8">
            <h1 className="font-nunito font-mediumSemiBold text-[36px] leading-[44px] tracking-[-3%] text-title-color">
              Doctors Registration
            </h1>
          </div>
        </div>
        <form onSubmit={submitForm} className="mt-8 px-3 lg:px-0">
          <div className="font-nunito text-center lg:text-left font-normal text-[24px] leading-[32px] tracking-[-3%] text-title-color">
            Registration
          </div>
          <div className="space-y-6 mt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div>
                <input
                  type="text"
                  id="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder={placeholders.email}
                  className="w-full lg:w-[290px] border border-gray-300 px-4 py-4 rounded"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  id="fullname"
                  value={form.fullname}
                  onChange={handleChange}
                  placeholder={placeholders.fullname}
                  className="w-full lg:w-[290px] border border-gray-300 px-4 py-4 rounded"
                />
                {errors.fullname && (
                  <p className="text-red-500 text-sm mt-2">{errors.fullname}</p>
                )}
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={placeholders.password}
                  className="w-full lg:w-[290px] border border-gray-300 px-4 py-4 rounded"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  👁
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">{errors.password}</p>
                )}
              </div>

              <div className="relative">
                <input
                  type={repasswordVisible ? "text" : "password"}
                  id="repassword"
                  value={form.repassword}
                  onChange={handleChange}
                  placeholder={placeholders.repassword}
                  className="w-full lg:w-[290px] border border-gray-300 px-4 py-4 rounded"
                />
                <button
                  type="button"
                  onClick={toggleRePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  👁
                </button>
                {errors.repassword && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.repassword}
                  </p>
                )}
              </div>
            </div>

            <div className="text-lg font-semibold">Gender</div>
            <div className="flex items-center gap-6">
              <label>
                <input
                  type="radio"
                  id="gender"
                  value="Male"
                  checked={form.gender === "Male"}
                  onChange={handleChange}
                  className="mr-3"
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  id="gender"
                  value="Female"
                  checked={form.gender === "Female"}
                  onChange={handleChange}
                  className="mr-3"
                />
                Female
              </label>
              <label>
                <input
                  type="radio"
                  id="gender"
                  value="Other"
                  checked={form.gender === "Other"}
                  onChange={handleChange}
                  className="mr-3"
                />
                Other
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender}</p>
            )}
            <div className="flex flex-col lg:flex-row gap-6">
              <div>
                <input
                  type="text"
                  id="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder={placeholders.contact}
                  className="w-full lg:w-[290px] border border-gray-300 px-4 py-4 rounded"
                />
                {errors.contact && (
                  <p className="text-red-500 text-sm mt-2">{errors.contact}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  id="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  placeholder={placeholders.specialization}
                  className="w-full lg:w-[290px] border border-gray-300 px-4 py-4 rounded"
                />
                {errors.specialization && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.specialization}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6">
              <div>
                <input
                  type="text"
                  id="cnic"
                  value={form.cnic}
                  onChange={handleChange}
                  placeholder={placeholders.cnic}
                  className="w-full lg:w-[290px] border border-gray-300 px-4 py-4 rounded"
                />
                {errors.cnic && (
                  <p className="text-red-500 text-sm mt-2">{errors.cnic}</p>
                )}
              </div>

              <div>
                <input
                  type="number"
                  id="experience"
                  value={form.experience}
                  onChange={handleChange}
                  placeholder={placeholders.experience}
                  className="w-full lg:w-[290px] border border-gray-300 px-4 py-4 rounded"
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.experience}
                  </p>
                )}
              </div>
            </div>
            <div>
              <input
                type="text"
                id="address"
                value={form.address}
                onChange={handleChange}
                placeholder={placeholders.address}
                className="w-full border border-gray-300 px-4 py-4 rounded"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-2">{errors.address}</p>
              )}
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="px-6 rounded-lg w-full py-4 bg-[#1061E5] text-white"
              >
                {loading ? <Loader /> : "Sign Up"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegistration;
