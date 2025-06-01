import { useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/authSlice";
import { setUser } from "../store/slices/userSlice";

import loginImage from "../assets/images/LoginImage.png";
import eyeIcon from "../assets/icons/eye.svg";
import eyeSlashIcon from "../assets/icons/eye-slash.svg";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signin", { email, password });

            const { token, user } = response.data;
            dispatch(login({ token, userId: user._id }));
            dispatch(setUser(user));

            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }
    };

    if (isAuthenticated) return <Navigate to="/dashboard" />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white ">
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar theme="dark" />

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-gray-800 shadow-lg rounded-lg overflow-hidden  transition-transform duration-300 hover:scale-105">
                <div className="hidden md:block">
                    <img src={loginImage} alt="Login" className="h-full w-full object-cover opacity-90" />
                </div>

                <div className="p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-center text-yellow-400 mb-4">Welcome Back!</h2>
                    <p className="text-center text-gray-400 mb-6">Log in to continue</p>

                    <form className="space-y-4" onSubmit={handleSignIn}>
                        <div>
                            <label className="block text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-400"
                                >
                                    <img src={showPassword ? eyeSlashIcon : eyeIcon} alt="Toggle" className="w-5 h-6" />
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-md font-bold"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="text-center text-sm mt-4">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-yellow-400 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                    <p className="text-center text-sm mt-2">
                        <Link to="/forgot-password" className="text-yellow-400 hover:underline">
                            Forgot Password?
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
