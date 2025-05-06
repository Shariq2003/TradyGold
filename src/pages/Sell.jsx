import { useState } from "react";
import { useSelector } from "react-redux";

export default function Sell() {
    const [activeTab, setActiveTab] = useState("quantity");
    const [quantity, setQuantity] = useState("");
    const [amount, setAmount] = useState("");

    const trade = useSelector((state) => state.trade);

    const currentGoldPrice = useSelector((state) => state.gold.livePrice) || 0;
    const platformChargePercent = 3;
    const availableGold = (trade.goldAvailable) || 0;
    const totalReceivableAmount = quantity
        ? (quantity * currentGoldPrice * (1 - platformChargePercent / 100)).toFixed(2)
        : "0.00";

    // const goldQuantityByAmount = amount
    //     ? (amount / (currentGoldPrice * (1 - platformChargePercent / 100))).toFixed(4)
    //     : "0.0000";

    const totalAmountReceivable = amount
        ? (amount * (1 - platformChargePercent / 100)).toFixed(2)
        : "0.00";

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-900 text-white shadow-xl rounded-lg">
            <div className="flex justify-center mb-6 bg-gray-700 p-1 rounded-full">
                <button
                    className={`w-1/2 py-2 text-center rounded-full transition-all duration-300 ${activeTab === "quantity" ? "bg-red-500 text-white shadow-md" : "text-gray-400"
                        }`}
                    onClick={() => setActiveTab("quantity")}
                >
                    By Quantity
                </button>
                <button
                    className={`w-1/2 py-2 text-center rounded-full transition-all duration-300 ${activeTab === "amount" ? "bg-orange-500 text-white shadow-md" : "text-gray-400"
                        }`}
                    onClick={() => setActiveTab("amount")}
                >
                    By Amount
                </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold text-gray-300">Sell Your Gold Securely</h2>
                <p className="text-sm text-gray-500">Get instant payment to your wallet</p>

                <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg mt-4">
                    <span className="text-sm text-gray-400">🏆 Gold Available:</span>
                    <span className="text-yellow-400 font-semibold">{availableGold} gm</span>
                </div>

                <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg mt-2">
                    <span className="text-sm text-gray-400">💰 Live Price:</span>
                    <span className="text-yellow-400 font-semibold">₹{currentGoldPrice}/gm - {platformChargePercent}% Charges</span>
                </div>

                {activeTab === "quantity" ? (
                    <form className="space-y-4 mt-4">
                        <label className="block text-gray-300 font-semibold">
                            Enter Gold Quantity (grams)
                            <input
                                value={quantity}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const numericValue = Number(value);
                                    const maxQuantity = availableGold;

                                    if (
                                        value === "" ||
                                        (!isNaN(numericValue) && numericValue >= 0 && numericValue <= maxQuantity)
                                    ) {
                                        setQuantity(value);
                                    }
                                }}

                                className="w-full p-3 border rounded-lg mt-1 bg-gray-900 text-white focus:ring-2 focus:ring-red-400"
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
                            Total Gold Available: <span className="text-green-400 font-semibold">{trade.goldAvailable} gm</span>
                        </p>
                        <p className="text-gray-400">
                            Total Receivable Amount: <span className="text-green-400 font-semibold">₹{totalReceivableAmount}</span>
                        </p>

                        <button className="w-full bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition">
                            Sell Gold
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
                                    const numericValue = Number(value);
                                    const maxAmount = availableGold * currentGoldPrice;

                                    if (
                                        value === "" ||
                                        (!isNaN(numericValue) && numericValue >= 0 && numericValue <= maxAmount)
                                    ) {
                                        setAmount(value);
                                    }
                                }}
                                className="w-full p-3 border rounded-lg mt-1 bg-gray-900 text-white focus:ring-2 focus:ring-orange-400"
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
                                Amount of Available Gold: <span className="text-blue-400 font-semibold">{(currentGoldPrice * trade.goldAvailable) - (currentGoldPrice * trade.goldAvailable * platformChargePercent/100)} gm</span>
                        </p>
                        
                        <p className="text-gray-400">
                            Total Receivable Amount: <span className="text-green-400 font-semibold">₹{totalAmountReceivable}</span>
                        </p>

                        <button className="w-full bg-orange-500 text-white py-3 rounded-lg shadow-md hover:bg-orange-600 transition">
                            Sell Gold
                        </button>
                    </form>
                )}

                {activeTab === "quantity" ? (
                    <div className="mt-6">
                        <p className="text-gray-400 mb-2">Recommended</p>
                        <div className="grid grid-cols-4 gap-3">
                            {[1, 5, 10, 20].map((value) => (
                                <button
                                    key={value}
                                    onClick={() => {
                                        if (value <= availableGold) setQuantity(value);
                                    }}
                                    className="p-3 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition"
                                >
                                    {value} gm
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="mt-6">
                        <p className="text-gray-400 mb-2">Recommended</p>
                        <div className="grid grid-cols-4 gap-3">
                            {[1000, 5000, 10000, 20000].map((value) => (
                                <button
                                    key={value}
                                    onClick={() => {
                                        if (value <= availableGold*currentGoldPrice) setAmount(value);
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
