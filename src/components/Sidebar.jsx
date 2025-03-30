import React from "react";
import { FaHome, FaChartBar, FaShoppingCart, FaMoneyBillWave, FaUser, FaSignOutAlt } from "react-icons/fa";
import {logout} from '../store/slices/authSlice';
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const Sidebar = ({ activeTab, onTabChange }) => {
    const dispatch = useDispatch();
    const tabs = [
        { name: "Dashboard", icon: <FaHome size={28} /> },
        { name: "Analysis", icon: <FaChartBar size={28} /> },
        { name: "Buy", icon: <FaShoppingCart size={28} /> },
        { name: "Sell", icon: <FaMoneyBillWave size={28} /> },
        { name: "Profile", icon: <FaUser size={28} /> },
    ];

    const handleLogout = () => {
        toast.success("Logout successful. Redirecting...");
        setTimeout(() => {
            dispatch(logout());
        }, 1000);
    };

    return (
        <aside className="w-[12%] min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
            <h2 className="text-xl font-bold mb-6">TradyGold</h2>
            <ul className="flex flex-col gap-5 w-full">
                {tabs.map((tab, index) => (
                    <li
                        key={index}
                        onClick={() => onTabChange(tab.name)}
                        className={`flex flex-col items-center justify-center w-full h-20 rounded-lg cursor-pointer transition-all duration-300
                        ${activeTab === tab.name ? "bg-blue-500 text-white scale-105" : "bg-gray-800 hover:bg-gray-700"}`}
                    >
                        {tab.icon}
                        <span className="text-sm mt-2">{tab.name}</span>
                    </li>
                ))}
                <li
                    onClick={handleLogout}
                    className="flex flex-col items-center justify-center w-full h-20 rounded-lg cursor-pointer transition-all duration-300 bg-red-600 hover:bg-red-500 mt-auto"
                >
                    <FaSignOutAlt size={28} />
                    <span className="text-sm mt-2">Logout</span>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
