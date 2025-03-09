import { useNavigate } from "react-router-dom";

const BuyButton = ({ amount }) => {
    const navigate = useNavigate();

    const handleBuy = () => {
        localStorage.setItem("paymentAmount", amount);
        navigate("/mock-payment");
    };

    return (
        <button onClick={handleBuy} className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition">
            Pay ₹{amount}
        </button>
    );
};

export default BuyButton;
