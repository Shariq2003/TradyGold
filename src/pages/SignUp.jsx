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
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [validation, setValidation] = useState({
        isLowerUpper: false,
        isNumber: false,
        isSpecialChar: false,
        isMinLength: false
    });
    const [availability, setAvailability] = useState({
        usernameMessage: "",
        emailMessage: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const ApiUrl = process.env.NODE_ENV === 'production'
        ? 'https://agro-tech-ai-backend-teal.vercel.app'
        : 'http://localhost:8080';

    const validatePassword = (password) => {
        setFormData(prev => ({ ...prev, password }));
        setValidation({
            isLowerUpper: /[a-z]/.test(password) && /[A-Z]/.test(password),
            isNumber: /\d/.test(password),
            isSpecialChar: /[!@#$%^&*]/.test(password),
            isMinLength: password.length >= 8
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const checkAvailability = async (field, value) => {
        if (value.length < 3) return;
        try {
            const response = await axios.get(`${ApiUrl}/auth/check-${field}/${value}`);
            setAvailability(prev => ({ ...prev, [`${field}Message`]: response.data.message }));
        } catch {
            setAvailability(prev => ({ ...prev, [`${field}Message`]: `Error checking ${field}` }));
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        const { firstName, lastName, username, email, password } = formData;

        if (!firstName || !lastName || !username || !email || !password) {
            return toast.error("All fields are required.");
        }
        if (Object.values(validation).includes(false)) {
            return toast.error("Password does not meet the criteria.");
        }

        setIsSubmitting(true);
        try {
            await axios.post(`${ApiUrl}/auth/signup`, formData);
            setFormData({ firstName: "", lastName: "", username: "", email: "", password: "" });
            navigate(`/verification?email=${email}`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-20 bg-gradient-to-r from-blue-400 to-green-500">
            <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop />
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-10 flex flex-col justify-center">
                    <h2 className="text-4xl font-bold text-center text-blue-600">Join Us Today!</h2>
                    <form className="space-y-4" onSubmit={handleSignUp}>
                        {['firstName', 'lastName', 'username', 'email'].map(field => (
                            <div key={field}>
                                <label className="block text-sm font-medium text-blue-600" htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    id={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    onBlur={() => checkAvailability(field, formData[field])}
                                    className="w-full px-4 py-2 mt-1 rounded-md bg-blue-100"
                                    required
                                    disabled={isSubmitting}
                                />
                                {availability[`${field}Message`] && <p className="text-sm text-red-600">{availability[`${field}Message`]}</p>}
                            </div>
                        ))}
                        <div>
                            <label className="block text-sm font-medium text-blue-600" htmlFor="password">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) => validatePassword(e.target.value)}
                                    className="w-full px-4 py-2 mt-1 rounded-md bg-blue-100"
                                    required
                                    disabled={isSubmitting}
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">
                                    <img src={showPassword ? eyeSlashIcon : eyeIcon} alt="Show/Hide" className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-blue-500 text-white rounded-md">Sign Up</button>
                    </form>
                    <button onClick={() => window.location.href = `${ApiUrl}/auth/google`} className="w-full mt-4 py-2 flex items-center justify-center border rounded-md">
                        <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />Sign in with Google
                    </button>
                    <p className="text-center text-sm mt-4">Already have an account? <a href="/signin" className="text-blue-500">Log In</a></p>
                </div>
                <div className="hidden md:block">
                    <img src={signupImage} alt="Signup" className="h-full w-full object-cover" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;