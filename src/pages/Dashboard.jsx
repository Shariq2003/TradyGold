import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGoldData } from "../store/slices/goldSlice";
import GoldChart from "../components/GoldChart";
import DashboardCard from "../components/DashboardCard";
import GoldTable from "../components/GoldTable";
import { FaCoins, FaBalanceScale, FaShoppingCart, FaWallet, FaChartLine, FaMoneyBill } from "react-icons/fa";
import { getDateBeforeXDays, getDaysDifference } from "../utils/days";

const Dashboard = () => {
    const dispatch = useDispatch();
    const goldData = useSelector((state) => state.gold);
    const tradeData = useSelector((state) => state.trade);
    const userData = useSelector((state) => state.user);
    const [days,setDays] = useState(7);

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

            const responsePredictions = await fetch(`http://127.0.0.1:8000/api/predict/?num_days=${days}`);
            if (!responsePredictions.ok) throw new Error("Failed to fetch predictions");
            const predictionData = await responsePredictions.json();
            console.log(predictionData);

            dispatch(setGoldData({
                livePrice: priceData.price_gram_24k ? priceData.price_gram_24k : 0,
                trend: priceTrends ? priceTrends : [],
                prediction: predictionData.predictions ? predictionData.predictions : {},
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
    }, [dispatch,days]);

    const cardsData = [
        { title: "Current Gold Value", icon: <FaCoins />, value: goldData.livePrice ? `₹${goldData.livePrice}/g` : "Loading...", color: "bg-blue-500" },
        { title: "Gold Available", icon: <FaBalanceScale />, value: tradeData?.goldAvailable ? `${tradeData.goldAvailable}g` : "N/A", color: "bg-green-500" },
        { title: "Portfolio (P/L)", icon: <FaChartLine />, value: tradeData?.portfolio ? `₹${tradeData.portfolio}` : "N/A", color: "bg-purple-500" },
        { title: "Gold Bought", icon: <FaShoppingCart />, value: tradeData?.goldBought ? `₹${tradeData.goldBought}` : "N/A", color: "bg-yellow-500" },
        { title: "Gold Sold", icon: <FaMoneyBill />, value: tradeData?.goldSold ? `₹${tradeData.goldSold}` : "N/A", color: "bg-red-500" },
        { title: "Wallet Balance", icon: <FaWallet />, value: userData?.balance ? `₹${userData.balance}` : "N/A", color: "bg-indigo-500" },
    ];

    return (
        <div className="w-full p-6 space-y-6">
            {/* <h1 className="text-2xl font-bold mb-4">Dashboard</h1> */}
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

            <GoldChart data={goldData.trend} days={days} setDays={setDays}/>
        </div>
    );
};

export default Dashboard;
