import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGoldData } from "../store/slices/goldSlice";
import GoldChart from "../components/Charts/GoldChart";
import DashboardCard from "../components/DashboardCard";
import GoldTable from "../components/Tables/GoldTable";
import { FaCoins, FaBalanceScale, FaShoppingCart, FaWallet, FaChartLine, FaMoneyBill } from "react-icons/fa";
import { getDateBeforeXDays } from "../utils/days";
import toast from "react-hot-toast";
import useFetchTradeData from "../hooks/useFetchTradeData";
import UserProfileImg from "../assets/images/UserProfile.png";

const Dashboard = () => {
    const dispatch = useDispatch();
    const goldData = useSelector((state) => state.gold);
    const tradeData = useSelector((state) => state.trade);
    const userData = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);
    const profileImage = userData.profilePic ? userData.profilePic : UserProfileImg;

    const [days, setDays] = useState(7);
    const [predictionDays, setPredictionDays] = useState(7);
    const [trendLoading, setTrendLoading] = useState(true);
    const [predictionsLoading, setPredictionsLoading] = useState(true);
    const [livePriceLoading, setLivePriceLoading] = useState(true);
    const [goldTableData, setGoldTableData] = useState({});

    const fetchTradeData = useFetchTradeData();

    const fetchLivePrices = async () => {
        setLivePriceLoading(true);
        toast.loading("Fetching live gold prices...", { id: "live-price" });
        // if(goldData.livePrice === 0) {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/live-prices/");
                if (!response.ok) throw new Error("Failed to fetch live prices");

                const priceData = await response.json();
                dispatch(setGoldData({ livePrice: priceData.price ? Number(priceData.price / 28.3495).toFixed(4) : "0.0000" }));
                setGoldTableData(priceData);

                toast.success("Live prices updated!", { id: "live-price" });
            } catch (error) {
                console.error("Error fetching live prices:", error);
                toast.error("Failed to fetch live prices", { id: "live-price" });
            } finally {
                setLivePriceLoading(false);
            }
        // }
        // else{
        //     toast.success("Live prices updated!", { id: "live-price" });
        //     setLivePriceLoading(false);
        // }
    };

    const fetchPriceTrends = async () => {
        setTrendLoading(true);
        toast.loading("Fetching Trends...", { id: "trends" });
        try {
            const startDate = getDateBeforeXDays(days);
            const endDate = new Date().toISOString().split("T")[0];
            const response = await fetch(`http://127.0.0.1:8000/api/gold-prices/?start_date=${startDate}&end_date=${endDate}`);
            if (!response.ok) throw new Error("Failed to fetch price trends");

            const priceTrends = await response.json();
            dispatch(setGoldData({ trend: priceTrends || {} }));
            toast.success("Trends updated!", { id: "trends" });
        } catch (error) {
            console.error("Error fetching price trends:", error);
            toast.error("Failed to fetch Trends", { id: "trends" });
        } finally {
            setTrendLoading(false);
        }
    };

    const fetchPredictions = async () => {
        setPredictionsLoading(true);
        toast.loading("Fetching Predictions...", { id: "predictions" });
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/predict/?num_days=${predictionDays}`);
            if (!response.ok) throw new Error("Failed to fetch predictions");

            const predictionData = await response.json();
            dispatch(setGoldData({ prediction: predictionData || {} }));
            toast.success("Predictions updated!", { id: "predictions" });
        } catch (error) {
            console.error("Error fetching predictions:", error);
            toast.error("Failed to fetch Predictions", { id: "predictions" });
        } finally {
            setPredictionsLoading(false);
        }
    };

    useEffect(() => {
        fetchLivePrices();
        const interval = setInterval(fetchLivePrices, 30 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        fetchPriceTrends();
    }, [days]);

    useEffect(() => {
        fetchPredictions();
    }, [predictionDays]);

    useEffect(() => {
        fetchTradeData(auth.token);
    },[]);

    const cardsData = [
        {
            title: "Current Digital Gold Value",
            icon: <FaCoins className="text-yellow-400" />,
            value: livePriceLoading
                ? "Loading..."
                : `₹${Number(goldData.livePrice).toFixed(4)}/g`,
            color: "bg-gray-800 border border-yellow-500 shadow-lg",
        },
        {
            title: "My Gold",
            icon: <FaBalanceScale className="text-green-400" />,
            value:
                tradeData?.goldAvailable != null && !isNaN(Number(tradeData.goldAvailable))
                    ? `${Number(tradeData.goldAvailable).toFixed(4)}g`
                    : "N/A",
            color: "bg-gray-800 border border-green-500 shadow-lg",
        },
        // {
        //    title: `Welcome ${userData.username}`,

        //     src:profileImage,
        //     value:
        //         tradeData?.portfolio != null && !isNaN(Number(tradeData.portfolio))
        //             ? `₹${Number(tradeData.portfolio).toFixed(4)}`
        //             : "N/A",
        //     color: "bg-gray-800 border border-purple-500 shadow-lg",
        // },
        {
            title: "Wallet Balance",
            icon: <FaWallet className="text-blue-400" />,
            value:
                userData?.balance != null && !isNaN(Number(userData.balance))
                    ? `₹${Number(tradeData.balance).toFixed(4)}`
                    : "N/A",
            color: "bg-gray-800 border border-blue-500 shadow-lg",
        },
        {
            title: "Gold Bought",
            icon: <FaShoppingCart className="text-yellow-400" />,
            value:
                tradeData?.goldBought != null && !isNaN(Number(tradeData.goldBought))
                    ? `${Number(tradeData.goldBought).toFixed(4)}g`
                    : "N/A",
            color: "bg-gray-800 border border-yellow-500 shadow-lg",
        },
        {
            title: "Gold Sold",
            icon: <FaMoneyBill className="text-red-400" />,
            value:
                tradeData?.goldSold != null && !isNaN(Number(tradeData.goldSold))
                    ? `${Number(tradeData.goldSold).toFixed(4)}g`
                    : "N/A",
            color: "bg-gray-800 border border-red-500 shadow-lg",
        },
    ];


    return (
        <div className="w-full p-6 space-y-6 bg-gray-900 text-gray-200 min-h-screen">
            <div className="grid gap-6 mb-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {cardsData.slice(0, 3).map((card, index) => (
                    <DashboardCard
                        key={index}
                        title={card.title}
                        icon={card.icon}
                        value={card.value}
                        color={card.color}
                    />
                ))}
            </div>
            <div className="grid gap-6 mb-6 grid-cols-1 lg:grid-cols-2">
                {cardsData.slice(3).map((card, index) => (
                    <DashboardCard
                        key={index + 3}
                        title={card.title}
                        icon={card.icon}
                        value={card.value}
                        color={card.color}
                    />
                ))}
            </div>
            {livePriceLoading ? (
                <p className="text-center text-gray-400">Loading live gold prices...</p>
            ) : (
                <GoldTable goldData={goldTableData} />
            )}
            <GoldChart data={goldData.trend} days={days} setDays={setDays} heading="Gold Price Trend" loading={trendLoading} disclaimer=""/>
            <GoldChart data={goldData.prediction} days={predictionDays} setDays={setPredictionDays} heading="Gold Price Prediction" loading={predictionsLoading} disclaimer="The gold price predictions are generated using machine learning models and are subject to uncertainties. They are intended for educational and informational purposes only and should not be solely relied upon for financial decisions. Always consult with a financial advisor before making investments." />
        </div>
    );
};

export default Dashboard;
