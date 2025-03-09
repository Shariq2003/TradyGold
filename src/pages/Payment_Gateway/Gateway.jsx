import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCreditCard, FaUniversity, FaWallet, FaQrcode } from "react-icons/fa";

export default function PaymentGateway() {
    const [selectedMethod, setSelectedMethod] = useState("upi");
    const [loading, setLoading] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        upiId: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
        cardHolder: "",
        bank: "",
        wallet: "",
    });
    const navigate = useNavigate();

    const handlePayment = (status) => {
        setLoading(true);
        setTimeout(() => {
            if (status === "success") {
                const transactionData = {
                    orderId: `TRX-${Date.now()}`,
                    amount: localStorage.getItem("paymentAmount"),
                    status: "success",
                    timestamp: new Date().toISOString(),
                };
                localStorage.setItem("mockTransaction", JSON.stringify(transactionData));
                navigate("/payment-success");
            } else {
                navigate("/payment-failed");
            }
        }, 2000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="w-[900px] bg-white rounded-xl shadow-2xl flex overflow-hidden">
                <div className="w-1/3 bg-blue-600 text-white p-6 flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg font-bold">Merchant Name</h2>
                        <p className="text-sm text-blue-200">Trusted Business</p>
                        <div className="mt-4 bg-blue-500 p-3 rounded-lg text-center text-lg font-bold">
                            ₹{localStorage.getItem("paymentAmount") || "0.00"}
                        </div>
                    </div>
                </div>

                <div className="w-2/3 p-6">
                    <h3 className="text-xl font-semibold mb-4">Payment Options</h3>
                    <div className="flex space-x-4 border-b pb-3">
                        <button onClick={() => setSelectedMethod("upi")} className={`flex-1 p-3 text-sm rounded-lg ${selectedMethod === "upi" ? "bg-gray-200" : "bg-white"}`}>
                            <FaQrcode className="inline-block mr-2" /> UPI
                        </button>
                        <button onClick={() => setSelectedMethod("card")} className={`flex-1 p-3 text-sm rounded-lg ${selectedMethod === "card" ? "bg-gray-200" : "bg-white"}`}>
                            <FaCreditCard className="inline-block mr-2" /> Cards
                        </button>
                        <button onClick={() => setSelectedMethod("netbanking")} className={`flex-1 p-3 text-sm rounded-lg ${selectedMethod === "netbanking" ? "bg-gray-200" : "bg-white"}`}>
                            <FaUniversity className="inline-block mr-2" /> NetBanking
                        </button>
                        <button onClick={() => setSelectedMethod("wallet")} className={`flex-1 p-3 text-sm rounded-lg ${selectedMethod === "wallet" ? "bg-gray-200" : "bg-white"}`}>
                            <FaWallet className="inline-block mr-2" /> Wallet
                        </button>
                    </div>

                    <div className="mt-4">
                        {selectedMethod === "upi" && (
                            <div>
                                <input type="text" placeholder="Enter UPI ID" className="w-full p-2 border rounded-lg" />
                                <p className="text-center mt-3">Or Scan QR Code</p>
                                <div className="bg-gray-300 w-32 h-32 mx-auto flex items-center justify-center text-gray-600 font-bold">
                                    QR CODE
                                </div>
                            </div>
                        )}
                        {selectedMethod === "card" && (
                            <div>
                                <input type="text" placeholder="Card Number" className="w-full p-2 border rounded-lg mb-2" />
                                <div className="flex space-x-2">
                                    <input type="text" placeholder="MM/YY" className="w-1/2 p-2 border rounded-lg" />
                                    <input type="text" placeholder="CVV" className="w-1/2 p-2 border rounded-lg" />
                                </div>
                                <input type="text" placeholder="Cardholder Name" className="w-full p-2 border rounded-lg mt-2" />
                            </div>
                        )}
                        {selectedMethod === "netbanking" && (
                            <select className="w-full p-2 border rounded-lg">
                                <option>Select Bank</option>
                                <option>HDFC Bank</option>
                                <option>ICICI Bank</option>
                                <option>SBI</option>
                                <option>Axis Bank</option>
                            </select>
                        )}
                        {selectedMethod === "wallet" && (
                            <select className="w-full p-2 border rounded-lg">
                                <option>Select Wallet</option>
                                <option>Paytm</option>
                                <option>PhonePe</option>
                                <option>Google Pay</option>
                            </select>
                        )}
                    </div>

                    <div className="mt-6 flex space-x-3">
                        <button
                            onClick={() => handlePayment("success")}
                            disabled={loading}
                            className="flex-1 bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition"
                        >
                            {loading ? "Processing..." : "Pay Successfully"}
                        </button>
                        <button
                            onClick={() => handlePayment("failed")}
                            disabled={loading}
                            className="flex-1 bg-red-500 text-white py-3 rounded-lg shadow-md hover:bg-red-600 transition"
                        >
                            {loading ? "Processing..." : "Fail Payment"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}