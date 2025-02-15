import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Mock Data for Different Time Ranges
const mockGoldData = {
    7: [5000, 5050, 5100, 4950, 5000, 5200, 5150],
    15: [4800, 4850, 4900, 4950, 5000, 5050, 5100, 5150, 5200, 5250, 5300, 5350, 5400, 5450, 5500],
    30: new Array(30).fill(0).map(() => Math.floor(Math.random() * 1000) + 5000),
    60: new Array(60).fill(0).map(() => Math.floor(Math.random() * 1000) + 5000),
    90: new Array(90).fill(0).map(() => Math.floor(Math.random() * 1000) + 5000),
};

const GoldChart = () => {
    const [days, setDays] = useState(7);

    const chartData = {
        labels: Array.from({ length: days }, (_, i) => `Day ${i + 1}`),
        datasets: [
            {
                label: "Gold Price",
                data: mockGoldData[days],
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
