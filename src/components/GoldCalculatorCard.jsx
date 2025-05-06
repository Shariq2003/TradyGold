import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { fetchLiveGoldPrice } from "../utils/api";

const GoldCalculatorCard = () => {
    const [activeTab, setActiveTab] = useState("quantity");
    const [quantity, setQuantity] = useState("");
    const [amount, setAmount] = useState("");
    const [currentGoldPrice, setCurrentGoldPrice] = useState(8861);
    const [loading, setLoading] = useState(true);

    const platformChargePercent = 3;
    const navigate = useNavigate();

    useEffect(() => {
        const getGoldPrice = async () => {
            try {
                const price = await fetchLiveGoldPrice();
                setCurrentGoldPrice(price);
            } catch (error) {
                toast.error("Failed to fetch live gold price. Using default price.");
            } finally {
                setLoading(false);
            }
        };
        getGoldPrice();
    }, []);

    // Calculations
    const totalPayableAmount = quantity
        ? (quantity * currentGoldPrice * (1 + platformChargePercent / 100)).toFixed(2)
        : "0.00";

    const goldQuantityByAmount = amount
        ? (amount / (currentGoldPrice * (1 + platformChargePercent / 100))).toFixed(4)
        : "0.0000";

    const totalAmountPayable = amount
        ? (amount * (1 + platformChargePercent / 100)).toFixed(2)
        : "0.00";

    const handleBuyClick = (e) => {
        e.preventDefault();
        if ((activeTab === "quantity" && quantity > 0) || (activeTab === "amount" && amount > 0)) {
            localStorage.setItem(
                "paymentAmount",
                activeTab === "quantity" ? totalPayableAmount : totalAmountPayable
            );
            navigate("/signin");
        } else {
            toast.error("Please enter a valid quantity or amount");
        }
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-md w-[450px] max-w-md">
            <div className="flex justify-center mb-6 bg-gray-700 p-1 rounded-full">
                <button
                    className={`w-1/2 py-2 text-center rounded-full ${activeTab === "quantity" ? "bg-blue-500 text-white" : "text-gray-400"
                        }`}
                    onClick={() => setActiveTab("quantity")}
                >
                    By Quantity
                </button>
                <button
                    className={`w-1/2 py-2 text-center rounded-full ${activeTab === "amount" ? "bg-green-500 text-white" : "text-gray-400"
                        }`}
                    onClick={() => setActiveTab("amount")}
                >
                    By Amount
                </button>
            </div>

            <h2 className="text-lg font-semibold text-gray-300">Buy 24K Gold at your convenience</h2>
            <p className="text-sm text-gray-500">Free storage in secure bank-grade lockers</p>

            <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg mt-4">
                <span className="text-sm text-gray-400">💰 Live Price:</span>
                {loading ? (
                    <span className="text-yellow-400 font-semibold animate-pulse">Loading...</span>
                ) : (
                    <span className="text-yellow-400 font-semibold">₹{currentGoldPrice}/gm + {platformChargePercent}% GST</span>
                )}
            </div>

            {activeTab === "quantity" ? (
                <form className="space-y-4 mt-4">
                    <label className="block text-gray-300 font-semibold">
                        Enter Gold Quantity (grams)
                        <input
                            value={quantity}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*\.?\d*$/.test(value)) setQuantity(value);
                            }}
                            className="w-full p-3 border rounded-lg mt-1 bg-gray-900 text-white"
                            placeholder="Enter grams"
                            inputMode="decimal"
                        />
                    </label>
                    <p className="text-gray-400">
                        Total Payable Amount: <span className="text-green-400 font-semibold">₹{totalPayableAmount}</span>
                    </p>
                </form>
            ) : (
                <form className="space-y-4 mt-4">
                    <label className="block text-gray-300 font-semibold">
                        Enter Amount (INR)
                        <input
                            value={amount}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*\.?\d*$/.test(value)) setAmount(value);
                            }}
                            className="w-full p-3 border rounded-lg mt-1 bg-gray-900 text-white"
                            placeholder="Enter amount"
                            inputMode="decimal"
                        />
                    </label>
                    <p className="text-gray-400">
                        Gold Quantity You Will Get: <span className="text-blue-400 font-semibold">{goldQuantityByAmount} gm</span>
                    </p>
                    <p className="text-gray-400">
                        Total Payable Amount: <span className="text-green-400 font-semibold">₹{totalAmountPayable}</span>
                    </p>
                </form>
            )}

            <button
                className="w-full mt-4 py-3 rounded-lg text-white shadow-md transition bg-yellow-500 hover:bg-yellow-600"
                onClick={handleBuyClick}
            >
                Buy Gold
            </button>
        </div>
    );
};

export default GoldCalculatorCard;
