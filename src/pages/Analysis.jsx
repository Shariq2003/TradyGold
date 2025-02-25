import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGoldData } from "../store/slices/goldSlice";
import GoldChart from "../components/Charts/GoldChart";
import { getDateBeforeXDays } from "../utils/days";

const Analysis = () => {
    const dispatch = useDispatch();
    const goldData = useSelector((state) => state.gold);
    const [days, setDays] = useState(7);
    const [preictionDays, setPreictionDays] = useState(7);

    const fetchGoldData = async () => {
        try {
            const startDate = getDateBeforeXDays(days);
            const endDate = new Date().toISOString().split("T")[0];

            const responseTrends = await fetch(`http://127.0.0.1:8000/api/gold-prices/?start_date=${startDate}&end_date=${endDate}`);
            if (!responseTrends.ok) throw new Error("Failed to fetch trends");
            const priceTrends = await responseTrends.json();

            const responsePredictions = await fetch(`http://127.0.0.1:8000/api/predict/?num_days=${preictionDays}`);
            if (!responsePredictions.ok) throw new Error("Failed to fetch predictions");
            const predictionData = await responsePredictions.json();

            dispatch(setGoldData({
                trend: priceTrends ? priceTrends : {},
                prediction: predictionData ? predictionData : {},
            }));
        } catch (error) {
            console.error("Error fetching gold data:", error);
        }
    };

    useEffect(() => {
        fetchGoldData();
    }, [days, preictionDays]);

    return (
        <div className="w-full p-6 space-y-6">
            <GoldChart data={goldData.trend} days={days} setDays={setDays} heading="Gold Price Trend" />
            <GoldChart data={goldData.prediction} days={preictionDays} setDays={setPreictionDays} heading="Gold Price Prediction" />
        </div>
    );
};

export default Analysis;
