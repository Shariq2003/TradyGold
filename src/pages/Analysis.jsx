import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGoldData } from "../store/slices/goldSlice";
import GoldChart from "../components/Charts/GoldChart";
import { getDateBeforeXDays } from "../utils/days";

const Analysis = () => {
    const dispatch = useDispatch();
    const goldData = useSelector((state) => state.gold);
    const [days, setDays] = useState(7);
    const [predictionDays, setPredictionDays] = useState(7);
    const [trendLoading, setTrendLoading] = useState(true);
    const [predictionsLoading, setPredictionsLoading] = useState(true);

    const fetchGoldTrends = async () => {
        setTrendLoading(true);
        try {
            const startDate = getDateBeforeXDays(days);
            const endDate = new Date().toISOString().split("T")[0];

            const responseTrends = await fetch(`http://127.0.0.1:8000/api/gold-prices/?start_date=${startDate}&end_date=${endDate}`);
            if (!responseTrends.ok) throw new Error("Failed to fetch trends");
            const priceTrends = await responseTrends.json();

            dispatch(setGoldData({ trend: priceTrends || {} }));
        } catch (error) {
            console.error("Error fetching gold trends:", error);
        } finally {
            setTrendLoading(false);
        }
    };

    const fetchGoldPredictions = async () => {
        setPredictionsLoading(true);
        try {
            const responsePredictions = await fetch(`http://127.0.0.1:8000/api/predict/?num_days=${predictionDays}`);
            if (!responsePredictions.ok) throw new Error("Failed to fetch predictions");
            const predictionData = await responsePredictions.json();
            dispatch(setGoldData({ prediction: predictionData || {} }));
        } catch (error) {
            console.error("Error fetching gold predictions:", error);
        } finally {
            setPredictionsLoading(false);
        }
    };

    useEffect(() => {
        fetchGoldTrends();
    }, [days]);

    useEffect(() => {
        fetchGoldPredictions();
    }, [predictionDays]);

    return (
        <div className="w-full p-6 space-y-6">
            <GoldChart data={goldData.trend} days={days} setDays={setDays} heading="Gold Price Trend" loading={trendLoading} />
            <GoldChart data={goldData.prediction} days={predictionDays} setDays={setPredictionDays} heading="Gold Price Prediction" loading={predictionsLoading} />
        </div>
    );
};

export default Analysis;
