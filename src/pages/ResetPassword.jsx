import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/auth/reset-password", {
        email: formData.email,
        otp: formData.otp,
        newPassword: formData.password,
      });

      toast.success("Password reset successful");
      setTimeout(() => navigate("/signin"), 3000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-[100vh] place-items-center bg-gray-900 text-white">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar theme="dark" />
      <div className="max-w-[500px] w-full p-6 lg:p-8 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-yellow-400">Reset Your Password</h1>
        <p className="my-4 text-gray-300">Enter your OTP and new password below.</p>

        <form onSubmit={handleReset} className="space-y-4">
          <div>
            <label className="text-sm text-white">Email <sup className="text-pink-200">*</sup></label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
              required
              className="w-full bg-gray-700 rounded-md px-3 py-2 mt-1 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-white">OTP <sup className="text-pink-200">*</sup></label>
            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleOnChange}
              required
              className="w-full bg-gray-700 rounded-md px-3 py-2 mt-1 text-white"
            />
          </div>

          <div className="relative">
            <label className="text-sm text-white">New Password <sup className="text-pink-200">*</sup></label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleOnChange}
              required
              className="w-full bg-gray-700 rounded-md px-3 py-2 mt-1 text-white pr-10"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-400"
            >
              {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
            </span>
          </div>

          <div className="relative">
            <label className="text-sm text-white">Confirm New Password <sup className="text-pink-200">*</sup></label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleOnChange}
              required
              className="w-full bg-gray-700 rounded-md px-3 py-2 mt-1 text-white pr-10"
            />
            <span
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-9 cursor-pointer text-gray-400"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
