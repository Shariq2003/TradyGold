import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
    const navigate = useNavigate();
    const [transaction, setTransaction] = useState(null);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem("mockTransaction"));
        setTransaction(data);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-900 text-white">
            <h2 className="text-3xl font-bold">✅ Payment Successful</h2>
            {transaction && (
                <div className="mt-4 bg-gray-800 p-4 rounded-lg">
                    <p>Order ID: {transaction.orderId}</p>
                    <p>Amount: ₹{transaction.amount}</p>
                    <p>Status: {transaction.status}</p>
                    <p>Time: {new Date(transaction.timestamp).toLocaleString()}</p>
                </div>
            )}
            <button
                onClick={() => navigate("/buy")}
                className="mt-6 px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 transition"
            >
                Go Back to Buy Page
            </button>
        </div>
    );
}
