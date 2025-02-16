import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGoldData } from "../store/slices/goldSlice";
import GoldChart from "../components/GoldChart";
import DashboardCard from "../components/DashboardCard";
import GoldTable from "../components/GoldTable";
import { FaCoins, FaBalanceScale, FaShoppingCart, FaWallet, FaChartLine, FaMoneyBill } from "react-icons/fa";

const Dashboard = () => {
    const dispatch = useDispatch();
    const goldData = useSelector((state) => state.gold);

    const fetchGoldPrices = async () => {
        try {
            const response = await fetch("http://127.0.0.1:8000/api/live-prices/");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();

            dispatch(setGoldData({
                livePrice: data.price_gram_24k,
                trend: [], 
                prediction: null,
                ...data,
            }));
        } catch (error) {
            console.error("Error fetching gold prices:", error);
        }
    };

    useEffect(() => {
        fetchGoldPrices();
        const interval = setInterval(fetchGoldPrices, 30*2*30000);
        return () => clearInterval(interval);
    }, [dispatch]);

    const cardsData = [
        { title: "Current Gold Value", icon: <FaCoins />, value: goldData.livePrice ? `₹${goldData.livePrice}/g` : "Loading...", color: "bg-blue-500" },
        { title: "Gold Available", icon: <FaBalanceScale />, value: "20g (₹1,04,000)", color: "bg-green-500" },
        { title: "Portfolio (P/L)", icon: <FaChartLine />, value: "+₹5,000", color: "bg-purple-500" },
        { title: "Gold Bought", icon: <FaShoppingCart />, value: "50g", color: "bg-yellow-500" },
        { title: "Gold Sold", icon: <FaMoneyBill />, value: "30g", color: "bg-red-500" },
        { title: "Wallet Balance", icon: <FaWallet />, value: "₹15,000", color: "bg-indigo-500" },
    ];

    return (
        <div className="w-full p-6 space-y-6">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {cardsData.map((card, index) => (
                    <DashboardCard key={index} title={card.title} icon={card.icon} value={card.value} color={card.color} />
                ))}
            </div>

            {goldData.livePrice === 0 ? (
                <p className="text-center text-gray-500">Loading live gold prices...</p>
            ) : (
                <GoldTable goldData={goldData} />
            )}

            <GoldChart />
        </div>
    );
};

export default Dashboard;