import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoLarge from "../assets/images/Logo.png";
import loginUser from "../api/loginUser";
import LoaderWhite from "../components/common/LoaderWhite";

const LoginComponent = () => {
  const [activeTab, setActiveTab] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const tabs = ["Admin", "Doctor", "Patient"];
  const registerPath = `/${activeTab.toLowerCase()}/register`;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const { userData } = await loginUser(email, password);
      if (userData.role === activeTab) {
        localStorage.setItem("role", activeTab);
        navigate(`/${activeTab.toLowerCase()}/dashboard`);
      } else {
        setError(`Only ${activeTab}s are Allowed to Login`);
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === "auth/wrong-password") {
        setError("Incorrect password.");
      } else if (error.code === "auth/user-not-found") {
        setError("No user found with this email.");
      } else {
        setError("Invalid Email/Password");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[600px]">
        <div className="flex flex-col items-center">
          <img src={LogoLarge} alt="Iwiina Lab Logo" className="h-8 w-[147px]" />
          <div className="flex gap-3 mt-6 px-2 py-[5px] rounded-full bg-[#1061E5]">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`lg:px-16 px-8 py-3 font-nunito font-semibold rounded-full text-[14px] leading-[20px] tracking-[-0.02px] text-bold-color ${
                  activeTab === tab ? "bg-white" : "bg-[#1061E5] text-white"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center text-[16px] font-semibold mt-2 font-poppins min-h-[24px]">
          {activeTab !== "Admin" && (
            <span className="flex">
              Don't have an account? {" "}
              <span className="ml-2">
                <Link to={registerPath} className="hover:text-[#1061E5] hover:underline">
                  Signup
                </Link>
              </span>
            </span>
          )}
        </div>

        <div className="mt-6 px-4 lg:px-0">
          <div className="font-nunito font-normal text-[24px] leading-8 tracking-[-3%] title-color">
            Login
          </div>
          <form className="mt-6" onSubmit={handleLogin}>
            <div className="space-y-6">
              <div>
                <input
                  id="email"
                  type="text"
                  placeholder="Email"
                  className="w-full border border-gray-300 px-4 py-4 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full border border-gray-300 px-4 py-4 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
            <div className="mt-6">
              <button
                className="w-full py-4 text-white bg-[#1061E5] text-bold-color font-medium rounded"
                type="submit"
                disabled={loading}
              >
                {loading ? <LoaderWhite /> : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
