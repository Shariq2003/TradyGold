import React from "react";
import { useSelector } from "react-redux";
import { FaEnvelope, FaWallet, FaUserEdit, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import UserProfileImg from "../assets/images/UserProfile.png";

const UserProfile = () => {
    const user = useSelector((state) => state.user);

    return (
        <div className="max-w-lg mx-auto bg-white shadow-xl rounded-lg p-8 border border-gray-200 flex flex-col items-center space-y-6">
            {/* Profile Picture */}
            <div className="relative w-32 h-32">
                <img
                    src={UserProfileImg}
                    alt="Profile"
                    className="w-full h-full rounded-full border-4 border-blue-500 shadow-md object-cover"
                />
                <button className="absolute bottom-0 right-2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600">
                    <FaUserEdit />
                </button>
            </div>

            {/* User Info */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800">{user.name || "User Name"}</h2>
                <p className="text-gray-600 text-sm flex items-center justify-center gap-2 mt-1">
                    <FaEnvelope className="text-blue-500" /> {user.email || "user@example.com"}
                </p>
                {user.phone && (
                    <p className="text-gray-600 text-sm flex items-center justify-center gap-2 mt-1">
                        <FaPhone className="text-green-500" /> {user.phone}
                    </p>
                )}
                {user.location && (
                    <p className="text-gray-600 text-sm flex items-center justify-center gap-2 mt-1">
                        <FaMapMarkerAlt className="text-red-500" /> {user.location}
                    </p>
                )}
            </div>

            {/* Wallet Balance */}
            <div className="w-full bg-gray-100 p-4 rounded-lg text-center shadow-inner flex flex-col items-center">
                <h3 className="text-lg font-medium flex items-center gap-2 text-gray-700">
                    <FaWallet className="text-green-500 text-xl" /> Wallet Balance
                </h3>
                <p className="text-green-600 font-semibold text-2xl">₹{user.balance || 0}</p>
            </div>
        </div>
    );
};

export default UserProfile;