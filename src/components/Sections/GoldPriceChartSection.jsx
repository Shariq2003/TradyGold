import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const generateData = (days) => {
    return Array.from({ length: days }, (_, i) => ({
        day: `Day ${i + 1}`,
        price: Math.floor(Math.random() * (6200 - 5800 + 1)) + 5800,
    }));
};

const GoldPriceChartSection = () => {
    const [selectedDays, setSelectedDays] = useState(7);
    const chartData = generateData(selectedDays);

    const dayOptions = [7, 15, 30, 60, 90];

    return (
        <section className="bg-gray-900 text-white py-20" id="chart">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Gold Price Trends
                </h2>

                <div className="flex justify-center mb-8 space-x-4 flex-wrap">
                    {dayOptions.map((days) => (
                        <button
                            key={days}
                            onClick={() => setSelectedDays(days)}
                            className={`px-6 py-2 my-2 text-white rounded ${selectedDays === days ? 'bg-yellow-500' : 'bg-gray-700'
                                } hover:bg-yellow-600 transition`}
                        >
                            {days} Days
                        </button>
                    ))}
                </div>

                <div className="w-full h-96 text-center">
                    <ResponsiveContainer>
                        <LineChart data={chartData}>
                            <XAxis dataKey="day" />
                            <YAxis domain={[5700, 6300]} />
                            <Tooltip />
                            <Line type="monotone" dataKey="price" stroke="#FACC15" strokeWidth={2} />
                        </LineChart>
                        <p className="mt-8 text-sm text-yellow-400 italic">
                            NOTE : The prices shown are simulated for demonstration purposes only. If you want to see the actual trends, predictions, and much more, please sign-up for an account or signin into your account.
                        </p>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
};

export default GoldPriceChartSection;
