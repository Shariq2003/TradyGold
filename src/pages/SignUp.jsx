import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import signupImage from "../assets/images/SignUpImage.png";
import eyeIcon from "../assets/icons/eye.svg";
import eyeSlashIcon from "../assets/icons/eye-slash.svg";
import googleIcon from "../assets/icons/icons8-google.svg";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post("http://localhost:5000/api/auth/signup", formData);
            toast.success("Signup successful");
            navigate("/signin");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar theme="dark" />

            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                <div className="p-8 flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-center text-yellow-400 mb-4">Join Us Today!</h2>
                    <form className="space-y-4" onSubmit={handleSignUp}>
                        {["firstName", "lastName", "username", "email"].map((field) => (
                            <div key={field}>
                                <label className="block text-sm font-medium text-gray-300" htmlFor={field}>
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </label>
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    id={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
                                    required
                                    disabled={isSubmitting}
                                />
                            </div>
                        ))}

                        <div>
                            <label className="block text-sm font-medium text-gray-300" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 mt-1 rounded-md bg-gray-700 text-white border border-gray-600 focus:ring-yellow-400 focus:border-yellow-400"
                                    required
                                    disabled={isSubmitting}
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
                            disabled={isSubmitting}
                            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-md font-bold"
                        >
                            {isSubmitting ? "Signing Up..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="text-center text-sm mt-4">
                        Already have an account?{" "}
                        <a href="/signin" className="text-yellow-400 hover:underline">
                            Log In
                        </a>
                    </p>
                </div>

                <div className="hidden md:block">
                    <img src={signupImage} alt="Signup" className="h-full w-full object-cover opacity-90" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
