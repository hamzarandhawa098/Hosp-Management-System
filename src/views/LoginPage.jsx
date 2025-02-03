import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";
import LogoLarge from "../assets/images/Logo.png";
import LoaderWhite from "../components/common/LoaderWhite";

const LoginComponent = () => {
  const [activeTab, setActiveTab] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.auth);
  const registerPath = `/${activeTab.toLowerCase()}/register`;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(({ userData }) => {
        if (userData.role === activeTab) {
          localStorage.setItem("role", activeTab);
          navigate(`/${activeTab.toLowerCase()}/dashboard`);
        } else {
          console.error(`Only ${activeTab}s are Allowed to Login`);
        }
      })
      .catch((error) => console.error("Login error:", error));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-[600px]">
        <div className="flex flex-col items-center">
          <img src={LogoLarge} alt="Iwiina Lab Logo" className="h-8 w-[147px]" />
          <div className="flex gap-3 mt-6 px-2 py-[5px] rounded-full bg-[#1061E5]">
            {["Admin", "Doctor", "Patient"].map((tab) => (
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
            <span>
              Don't have an account?{" "}
              <Link to={registerPath} className="ml-2 hover:text-[#1061E5] hover:underline">
                Signup
              </Link>
            </span>
          )}
        </div>

        <div className="mt-6 px-4 lg:px-0">
          <div className="font-nunito font-normal text-[24px] leading-8 tracking-[-3%] title-color">
            Login
          </div>
          <form className="mt-6" onSubmit={handleLogin}>
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Email"
                className="w-full border border-gray-300 px-4 py-4 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-300 px-4 py-4 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </div>
            <button
              className="w-full py-4 text-white bg-[#1061E5] text-bold-color font-medium rounded mt-6"
              type="submit"
              disabled={loading}
            >
              {loading ? <LoaderWhite /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
