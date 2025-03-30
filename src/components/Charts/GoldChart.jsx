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
    const dayOptions = [7, 15, 30, 60, 90];

    return (
        <div className="p-4 rounded-lg shadow-md bg-gray-900 text-white relative">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">{heading}</h2>
                
                <div className="flex space-x-2">
                    {dayOptions.map((option) => (
                        <button
                            key={option}
                            onClick={() => setDays(option)}
                            disabled={loading}
                            className={`px-4 py-2 rounded-lg text-sm font-semibold transition 
                                ${days === option ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 hover:bg-gray-600'}`}
                        >
                            {option} Days
                        </button>
                    ))}
                </div>
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
