import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function BuyPage() {
    const [activeTab, setActiveTab] = useState("quantity");
    const [quantity, setQuantity] = useState("");
    const [amount, setAmount] = useState("");

    const navigate = useNavigate();

    const currentGoldPrice = useSelector((state) => state.gold.livePrice) || 8861;
    const platformChargePercent = 3;

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
        if (activeTab === "quantity" && quantity > 0) {
            localStorage.setItem("paymentAmount", totalPayableAmount);
            localStorage.setItem("goldQuantity", quantity);
            localStorage.setItem("goldBuyType", "quantity");
            navigate("/mock-payment");
        } else if (activeTab === "amount" && amount > 0) {
            localStorage.setItem("paymentAmount", totalAmountPayable);
            localStorage.setItem("goldQuantity", goldQuantityByAmount); // calculated quantity
            localStorage.setItem("goldBuyType", "amount");
            navigate("/mock-payment");
        }
        else{
            toast.error("Please enter a valid quantity or amount");
        }
    };
    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 text-white shadow-xl rounded-lg">
            <div className="flex justify-center mb-6 bg-gray-700 p-1 rounded-full">
                <button
                    className={`w-1/2 py-2 text-center rounded-full transition-all duration-300 ${activeTab === "quantity" ? "bg-blue-500 text-white shadow-md" : "text-gray-400"
                        }`}
                    onClick={() => setActiveTab("quantity")}
                >
                    By Quantity
                </button>
                <button
                    className={`w-1/2 py-2 text-center rounded-full transition-all duration-300 ${activeTab === "amount" ? "bg-green-500 text-white shadow-md" : "text-gray-400"
                        }`}
                    onClick={() => setActiveTab("amount")}
                >
                    By Amount
                </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-300">Buy 24K Gold at your convenience</h2>
                <p className="text-sm text-gray-500">Free storage in secure bank-grade lockers</p>

                <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg mt-4">
                    <span className="text-sm text-gray-400">💰 Live Price:</span>
                    <span className="text-yellow-400 font-semibold">₹{currentGoldPrice}/gm + {platformChargePercent}% GST</span>
                </div>
                {activeTab === "quantity" ? (
                    <form className="space-y-4 mt-4">
                        <label className="block text-gray-300 font-semibold">
                            Enter Gold Quantity (grams)
                            <input
                                value={quantity}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || Number(value) >= 0) setQuantity(value);
                                }}
                                className="w-full p-3 border rounded-lg mt-1 bg-gray-900 text-white focus:ring-2 focus:ring-blue-400"
                                placeholder="Enter grams"
                                inputMode="decimal"
                                pattern="[0-9]*"
                                min="0"
                                step="0.01"
                                onWheel={(e) => e.target.blur()}
                                onKeyDown={(e) =>
                                    e.key === "ArrowUp" || e.key === "ArrowDown" ? e.preventDefault() : null
                                }
                            />
                        </label>

                        <p className="text-gray-400">
                            Total Payable Amount: <span className="text-green-400 font-semibold">₹{totalPayableAmount}</span>
                        </p>

                        <button 
                            className="w-full bg-blue-500 text-white py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
                            onClick={handleBuyClick}
                            >
                            Buy Gold
                        </button>
                    </form>
                ) : (
                    <form className="space-y-4 mt-4">
                        <label className="block text-gray-300 font-semibold">
                            Enter Amount (INR)
                            <input
                                value={amount}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === "" || Number(value) >= 0) setAmount(value);
                                }}
                                className="w-full p-3 border rounded-lg mt-1 bg-gray-900 text-white focus:ring-2 focus:ring-green-400"
                                placeholder="Enter amount"
                                inputMode="decimal"
                                pattern="[0-9]*"
                                min="0"
                                step="1"
                                onWheel={(e) => e.target.blur()}
                                onKeyDown={(e) =>
                                    e.key === "ArrowUp" || e.key === "ArrowDown" ? e.preventDefault() : null
                                }
                            />
                        </label>

                        <p className="text-gray-400">
                            Gold Quantity You Will Get: <span className="text-blue-400 font-semibold">{goldQuantityByAmount} gm</span>
                        </p>

                        <p className="text-gray-400">
                            Total Payable Amount: <span className="text-green-400 font-semibold">₹{totalAmountPayable}</span>
                        </p>

                        <button 
                            className="w-full bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition"
                            onClick={handleBuyClick}
                            >
                            Buy Gold
                        </button>
                    </form>
                )}
                {activeTab === "quantity" ? (
                    <div className="mt-6">
                        <p className="text-gray-400 mb-2">Recommended (Grams)</p>
                        <div className="grid grid-cols-4 gap-3">
                            {[0.5, 1, 2, 5].map((value) => (
                                <button
                                    key={value}
                                    onClick={() => setQuantity(value)}
                                    className="p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition"
                                >
                                    {value} gm
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="mt-6">
                        <p className="text-gray-400 mb-2">Recommended (INR)</p>
                        <div className="grid grid-cols-4 gap-3">
                            {[100, 500, 1500, 5000].map((value) => (
                                <button
                                    key={value}
                                    onClick={() => {
                                        setAmount(value);
                                        setActiveTab("amount");
                                    }}
                                    className="p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition"
                                >
                                    ₹{value}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
