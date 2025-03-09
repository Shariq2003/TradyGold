import { useNavigate } from "react-router-dom";

export default function PaymentFailed() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-900 text-white">
            <h2 className="text-3xl font-bold">❌ Payment Failed</h2>
            <p className="mt-2 text-gray-300">Something went wrong. Please try again.</p>
            <button
                onClick={() => navigate("/buy")}
                className="mt-6 px-6 py-3 bg-gray-500 rounded-lg hover:bg-gray-600 transition"
            >
                Go Back to Buy Page
            </button>
        </div>
    );
}
