import React from "react";
import GoldChart from "../components/GoldChart";
import DashboardCard from "../components/DashboardCard";
import { FaCoins, FaBalanceScale, FaShoppingCart, FaWallet, FaChartLine, FaMoneyBill } from "react-icons/fa";

const Dashboard = () => {
    const cardsData = [
        { title: "Current Gold Value", icon: <FaCoins />, value: "₹5,200/g", color: "bg-blue-500" },
        { title: "Gold Available", icon: <FaBalanceScale />, value: "20g (₹1,04,000)", color: "bg-green-500" },
        { title: "Portfolio (P/L)", icon: <FaChartLine />, value: "+₹5,000", color: "bg-purple-500" },
        { title: "Gold Bought", icon: <FaShoppingCart />, value: "50g", color: "bg-yellow-500" },
        { title: "Gold Sold", icon: <FaMoneyBill />, value: "30g", color: "bg-red-500" },
        { title: "Wallet Balance", icon: <FaWallet />, value: "₹15,000", color: "bg-indigo-500" },
    ];

    return (
        <div className="w-full p-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {cardsData.map((card, index) => (
                    <DashboardCard key={index} title={card.title} icon={card.icon} value={card.value} color={card.color} />
                ))}
            </div>
            <GoldChart />
        </div>
    );
};

export default Dashboard;
