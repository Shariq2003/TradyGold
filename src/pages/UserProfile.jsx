import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaEnvelope, FaWallet, FaUserEdit, FaCoins, FaShoppingCart, FaMoneyBill } from "react-icons/fa";
import UserProfileImg from "../assets/images/UserProfile.png";
import useFetchTradeData from "../hooks/useFetchTradeData";

const UserProfile = () => {
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    
    const tradeData = useSelector((state) => state.trade);
    
    const profileImage = user.profilePic ? user.profilePic : UserProfileImg;
    
    const fetchTradeData = useFetchTradeData();

    const cardsData = [
        {
            title: "Gold Owned",
            icon: <FaCoins className="text-yellow-400" />,
            value:
                tradeData?.goldAvailable != null && !isNaN(Number(tradeData.goldAvailable))
                    ? `${Number(tradeData.goldAvailable).toFixed(4)}g`
                    : "NA",
            color: "border-yellow-500",
        },
        {
            title: "Total Gold Bought",
            icon: <FaShoppingCart className="text-green-400" />,
            value:
                tradeData?.goldBought != null && !isNaN(Number(tradeData.goldBought))
                    ? `₹${Number(tradeData.goldBought).toFixed(4)}`
                    : "NA",
            color: "border-green-500",
        },
        {
            title: "Total Gold Sold",
            icon: <FaMoneyBill className="text-red-400" />,
            value:
                tradeData?.goldSold != null && !isNaN(Number(tradeData.goldSold))
                    ? `₹${Number(tradeData.goldSold).toFixed(4)}`
                    : "NA",
            color: "border-red-500",
        },
        {
            title: "Wallet Balance",
            icon: <FaWallet className="text-blue-400" />,
            value:
                tradeData?.balance != null && !isNaN(Number(tradeData.balance))
                    ? `₹${Number(tradeData.balance).toFixed(4)}`
                    : "NA",
            color: "border-blue-500",
        },
    ];

    useEffect(() => {
        if (auth.token && user?.userId) {
            fetchTradeData(auth.token);
        }
    }, [auth.token, user.userId, fetchTradeData]);

    return (
        <div className="max-w-lg mx-auto bg-gray-900 text-white shadow-xl rounded-lg p-8 border border-gray-700 flex flex-col items-center space-y-6">
            <div className="relative w-32 h-32">
                <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full border-4 border-yellow-500 shadow-md object-cover"
                />
                {/* <button className="absolute bottom-0 right-2 bg-yellow-500 text-gray-900 p-2 rounded-full shadow-md hover:bg-yellow-600">
                    <FaUserEdit />
                </button> */}
            </div>
            <div className="text-center">
                <h2 className="text-2xl font-bold">{user.username || "User Name"}</h2>
                <p className="text-gray-300 text-sm flex items-center justify-center gap-2 mt-1">
                    <FaEnvelope className="text-yellow-400" /> {user.email || "user@example.com"}
                </p>
            </div>

            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cardsData.map((card, index) => (
                    <div key={index} className={`bg-gray-800 p-4 rounded-lg text-center border ${card.color} shadow-lg`}>
                        <h3 className="text-lg font-medium flex items-center gap-2 justify-center">
                            {card.icon} {card.title}
                        </h3>
                        <p className="font-semibold text-2xl">{card.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProfile;
