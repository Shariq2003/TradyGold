import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const GoldChart = ({ data, days, setDays, heading, loading, disclaimer }) => {
    const safeData = data && typeof data === "object" ? data : {};
    const predictionEntries = heading === "Gold Price Trend"
        ? Object.entries(safeData).slice(0, days).reverse()
        : Object.entries(safeData).slice(0, days);

    const labels = predictionEntries.map(([date]) => date);
    const values = predictionEntries.map(([, price]) => price);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Gold Price",
                data: values,
                borderColor: "#FFD700",
                backgroundColor: "rgba(255, 215, 0, 0.3)",
                tension: 0.3,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                labels: {
                    color: "#fff", // White legend text
                },
            },
        },
        scales: {
            x: {
                ticks: { color: "#fff" },
                grid: { color: "rgba(255, 255, 255, 0.2)" },
            },
            y: {
                ticks: { color: "#fff" },
                grid: { color: "rgba(255, 255, 255, 0.2)" },
            },
        },
    };

    return (
        <div className="p-4 rounded-lg shadow-md bg-gray-900 text-white relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{heading}</h2>
                <select
                    className="border p-2 rounded bg-gray-800 text-white"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    disabled={loading}
                >
                    <option value={7}>Last 7 Days</option>
                    <option value={15}>Last 15 Days</option>
                    <option value={30}>Last 30 Days</option>
                    <option value={60}>Last 60 Days</option>
                    <option value={90}>Last 90 Days</option>
                </select>
            </div>

            {loading ? (
                <div className="absolute inset-0 flex justify-center items-center bg-gray-900 bg-opacity-80">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-500"></div>
                </div>
            ) : (
                <>
                    <Line data={chartData} options={chartOptions} />
                    {disclaimer && (
                        <p className="mt-8 text-sm text-yellow-400 italic">
                            NOTE : {disclaimer}
                        </p>
                    )}
                </>
            )}
        </div>
    );
};

export default GoldChart;
