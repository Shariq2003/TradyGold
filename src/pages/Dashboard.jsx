import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGoldData } from "../store/slices/goldSlice";
import GoldChart from "../components/Charts/GoldChart";
import DashboardCard from "../components/DashboardCard";
import GoldTable from "../components/Tables/GoldTable";
import { FaCoins, FaBalanceScale, FaShoppingCart, FaWallet, FaChartLine, FaMoneyBill } from "react-icons/fa";
import { getDateBeforeXDays } from "../utils/days";
import toast from "react-hot-toast";

const Dashboard = () => {
    const dispatch = useDispatch();
    const goldData = useSelector((state) => state.gold);
    const tradeData = useSelector((state) => state.trade);
    const userData = useSelector((state) => state.user);
    const [days, setDays] = useState(7);
    const [predictionDays, setPredictionDays] = useState(7);
    const [trendLoading, setTrendLoading] = useState(true);
    const [predictionsLoading, setPredictionsLoading] = useState(true);
    const [livePriceLoading, setLivePriceLoading] = useState(true);

    const fetchLivePrices = async () => {
        setLivePriceLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/api/live-prices/");
            if (response.ok) {
                const priceData = await response.json();
                dispatch(setGoldData({ ...goldData, livePrice: priceData.price ? (priceData.price / 28.3495).toFixed(4) : 0.0000 }));
            } else {
                console.error("Failed to fetch live prices");
            }
        } catch (error) {
            console.error("Error fetching live prices:", error);
        } finally {
            setLivePriceLoading(false);
        }
    };

    const fetchPriceTrends = async () => {
        setTrendLoading(true);
        try {
            const startDate = getDateBeforeXDays(days);
            const endDate = new Date().toISOString().split("T")[0];
            const response = await fetch(`http://127.0.0.1:8000/api/gold-prices/?start_date=${startDate}&end_date=${endDate}`);
            if (response.ok) {
                const priceTrends = await response.json();
                dispatch(setGoldData({ ...goldData, trend: priceTrends || {} }));
            } else {
                console.error("Failed to fetch price trends");
            }
        } catch (error) {
            console.error("Error fetching price trends:", error);
        } finally {
            setTrendLoading(false);
        }
    };

    const fetchPredictions = async () => {
        setPredictionsLoading(true);
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/predict/?num_days=${predictionDays}`);
            if (response.ok) {
                const predictionData = await response.json();
                dispatch(setGoldData({ ...goldData, prediction: predictionData || {} }));
            } else {
                console.error("Failed to fetch predictions");
            }
        } catch (error) {
            console.error("Error fetching predictions:", error);
        } finally {
            setPredictionsLoading(false);
        }
    };

    useEffect(() => {
        toast.loading("Fetching gold data...", { id: "gold-data" });

        fetchLivePrices();
        fetchPriceTrends();
        fetchPredictions();

        toast.success("Gold data updated!", { id: "gold-data" });

        const interval = setInterval(() => {
            fetchLivePrices();
            fetchPriceTrends();
            fetchPredictions();
        }, 30 * 2 * 30000);

        return () => clearInterval(interval);
    }, [dispatch, days, predictionDays]);

    const cardsData = [
        { title: "Current Gold Value", icon: <FaCoins className="text-yellow-400" />, value: livePriceLoading ? "Loading..." : `₹${goldData.livePrice}/g`, color: "bg-gray-800 border border-yellow-500 shadow-lg" },
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
            {livePriceLoading ? (
                <p className="text-center text-gray-400">Loading live gold prices...</p>
            ) : (
                <GoldTable goldData={goldData} />
            )}
            <GoldChart data={goldData.trend} days={days} setDays={setDays} heading="Gold Price Trend" loading={trendLoading} />
            <GoldChart data={goldData.prediction} days={predictionDays} setDays={setPredictionDays} heading="Gold Price Prediction" loading={predictionsLoading} />
        </div>
    );
};

export default Dashboard;
