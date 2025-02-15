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
import googleIcon from "../assets/icons/icons8-google.svg";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const ApiUrl = process.env.NODE_ENV === 'production'
        ? 'https://agro-tech-ai-backend-teal.vercel.app'
        : 'http://localhost:8080';

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${ApiUrl}/auth/signin`, {
                email,
                password,
                rememberMe,
            });

            // If user needs verification, redirect
            if (response.status === 403) {
                navigate(`/verification?email=${email}`);
                return;
            }

            // Otherwise, log them in
            const { token, user } = response.data;
            dispatch(login(token));
            dispatch(setUser(user));

            toast.success("Login successful");
            navigate("/dashboard");

        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data?.message || "Login failed";
                toast.error(errorMessage);
                if (error.response.status === 403) {
                    navigate(`/verification?email=${email}`);
                }
            } else {
                toast.error("Network error or unexpected failure.");
            }
        }
    };

    const handleGoogleSignIn = () => {
        window.location.href = `${ApiUrl}/auth/google`;
    };

    if (isAuthenticated) return <Navigate to="/dashboard" />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar />

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
                <div className="hidden md:block">
                    <img src={loginImage} alt="Login" className="h-full w-full object-cover" />
                </div>

                <div className="p-10 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-center text-green-600 mb-4">Welcome Back!</h2>
                    <p className="text-center text-gray-600 mb-8">Log in to continue</p>

                    <form className="space-y-4" onSubmit={handleSignIn}>
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-green-600">Email</label>
                            <input
                                type="email"
                                placeholder="john@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 mt-1 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-green-600">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-2 mt-1 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-green-800"
                                >
                                    <img src={showPassword ? eyeSlashIcon : eyeIcon} alt="Toggle" className="w-5 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberMe"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="mr-2 text-green-600 focus:ring-green-500"
                            />
                            <label htmlFor="rememberMe" className="text-sm text-green-600">Remember Me</label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white rounded-md font-bold transition-transform transform hover:scale-105"
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Google Sign-In */}
                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full mt-4 py-2 flex items-center justify-center bg-white text-gray-700 border border-gray-300 rounded-md font-bold transition-transform transform hover:scale-105"
                    >
                        <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
                        Sign in with Google
                    </button>

                    {/* Links */}
                    <p className="text-center text-sm mt-4">
                        Don’t have an account? <Link to="/signup" className="text-green-500 hover:underline">Sign Up</Link>
                    </p>
                    <p className="text-center text-sm mt-2">
                        <Link to="/forgot-password" className="text-green-500 hover:underline">Forgot Password?</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
