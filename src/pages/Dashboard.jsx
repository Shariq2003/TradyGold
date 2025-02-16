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
    const tradeData = useSelector((state) => state.trade);
    const userData = useSelector((state) => state.user);

    const fetchGoldData = async () => {
        try {
            // Fetch Live Prices
            const responsePrices = await fetch("http://127.0.0.1:8000/api/live-prices/");
            if (!responsePrices.ok) throw new Error("Failed to fetch live prices");
            const priceData = await responsePrices.json();

            // Fetch Predictions (Default to 30 days)
            const responsePredictions = await fetch("http://127.0.0.1:8000/api/predict/?num_days=30");
            if (!responsePredictions.ok) throw new Error("Failed to fetch predictions");
            const predictionData = await responsePredictions.json();

            // Dispatch to Redux Store
            dispatch(setGoldData({
                livePrice: priceData.price_gram_24k,
                trend: [],
                prediction: predictionData.predictions, // Add prediction data
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
    }, [dispatch]);

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

            {/* Pass API prediction data to GoldChart */}
            <GoldChart predictions={goldData.prediction} />
        </div>
    );
};

export default Dashboard;
