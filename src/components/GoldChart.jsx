import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GoldChart = ({ data, days, setDays }) => {

    const predictionEntries = Object.entries(data || {}).slice(0, days);
    const labels = predictionEntries.map(([date]) => date);
    const values = predictionEntries.map(([, price]) => price);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Gold Price",
                data: values,
                borderColor: "gold",
                backgroundColor: "rgba(255, 215, 0, 0.5)",
                tension: 0.3,
            },
        ],
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Gold Price Trend</h2>
                <select
                    className="border p-2 rounded"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                >
                    <option value={7}>Last 7 Days</option>
                    <option value={15}>Last 15 Days</option>
                    <option value={30}>Last 30 Days</option>
                    <option value={60}>Last 60 Days</option>
                    <option value={90}>Last 90 Days</option>
                </select>
            </div>
            <Line data={chartData} />
        </div>
    );
};

export default GoldChart;
