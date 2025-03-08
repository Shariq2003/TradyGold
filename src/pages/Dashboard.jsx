import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGoldData } from "../store/slices/goldSlice";
import GoldChart from "../components/Charts/GoldChart";
import DashboardCard from "../components/DashboardCard";
import GoldTable from "../components/Tables/GoldTable";
import { FaCoins, FaBalanceScale, FaShoppingCart, FaWallet, FaChartLine, FaMoneyBill } from "react-icons/fa";
import { getDateBeforeXDays, getDaysDifference } from "../utils/days";

const Dashboard = () => {
    const dispatch = useDispatch();
    const goldData = useSelector((state) => state.gold);
    const tradeData = useSelector((state) => state.trade);
    const userData = useSelector((state) => state.user);
    const [days,setDays] = useState(7);
    const [preictionDays,setPreictionDays] = useState(7);

    const fetchGoldData = async () => {
        try {
            const startDate = getDateBeforeXDays(days);
            console.log("StartDate", startDate);
            const endDate = new Date().toISOString().split("T")[0];
            console.log("EndDate", endDate);

            const responsePrices = await fetch("http://127.0.0.1:8000/api/live-prices/");
            if (!responsePrices.ok) throw new Error("Failed to fetch live prices");
            const priceData = await responsePrices.json();
            console.log(priceData);

            const responsTrends = await fetch(`http://127.0.0.1:8000/api/gold-prices/?start_date=${startDate}&end_date=${endDate}`);
            if (!responsTrends.ok) throw new Error("Failed to fetch predictions");
            const priceTrends = await responsTrends.json();
            console.log(priceTrends);

            const responsePredictions = await fetch(`http://127.0.0.1:8000/api/predict/?num_days=${preictionDays}`);
            if (!responsePredictions.ok) throw new Error("Failed to fetch predictions");
            const predictionData = await responsePredictions.json();
            console.log(predictionData);

            dispatch(setGoldData({
                livePrice: priceData.price ? (priceData.price / 28.3495).toFixed(4) : 0.0000,
                trend: priceTrends ? priceTrends : {},
                prediction: predictionData ? predictionData : {},
                ...priceData,
            }));
        } catch (error) {
            console.error("Error fetching gold data:", error);
        }
    };

    useEffect(() => {
        fetchGoldData();
        const interval = setInterval(fetchGoldData, 30 * 2 * 30000);
        return () => clearInterval(interval);
    }, [dispatch,days,preictionDays]);

    const cardsData = [
        { title: "Current Gold Value", icon: <FaCoins className="text-yellow-400" />, value: goldData.livePrice ? `₹${goldData.livePrice}/g` : "Loading...", color: "bg-gray-800 border border-yellow-500 shadow-lg" },
        { title: "Gold Available", icon: <FaBalanceScale className="text-green-400" />, value: tradeData?.goldAvailable ? `${tradeData.goldAvailable}g` : "N/A", color: "bg-gray-800 border border-green-500 shadow-lg" },
        { title: "Portfolio (P/L)", icon: <FaChartLine className="text-purple-400" />, value: tradeData?.portfolio ? `₹${tradeData.portfolio}` : "N/A", color: "bg-gray-800 border border-purple-500 shadow-lg" },
        { title: "Gold Bought", icon: <FaShoppingCart className="text-yellow-400" />, value: tradeData?.goldBought ? `₹${tradeData.goldBought}` : "N/A", color: "bg-gray-800 border border-yellow-500 shadow-lg" },
        { title: "Gold Sold", icon: <FaMoneyBill className="text-red-400" />, value: tradeData?.goldSold ? `₹${tradeData.goldSold}` : "N/A", color: "bg-gray-800 border border-red-500 shadow-lg" },
        { title: "Wallet Balance", icon: <FaWallet className="text-blue-400" />, value: userData?.balance ? `₹${userData.balance}` : "N/A", color: "bg-gray-800 border border-blue-500 shadow-lg" },
    ];

    return (
        <div className="w-full p-6 space-y-6 bg-gray-900 text-gray-200 min-h-screen">
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

            <GoldChart data={goldData.trend} days={days} setDays={setDays} heading="Gold Price Trend"/>
            <GoldChart data={goldData.prediction} days={preictionDays} setDays={setPreictionDays} heading="Gold Price Prediction"/>
        </div>
    );
};

export default Dashboard;
