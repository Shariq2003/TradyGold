import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/forgot-password", { email });
            toast.success("OTP Sent Successfully");
            navigate("/reset-password");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar theme="dark" />
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md space-y-4"
            >
                <h2 className="text-2xl font-bold text-yellow-400 text-center">Forgot Password</h2>
                <p className="text-sm text-gray-400 text-center">Enter your email to receive an One Time Password (OTP)</p>
                <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-yellow-400"
                />
                <button
                    type="submit"
                    className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-md"
                >
                    Send OTP
                </button>
            </form>
        </div>
    );
};

export default ForgotPassword;
