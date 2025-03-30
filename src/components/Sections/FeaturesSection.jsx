import React from 'react';
import { FaChartLine, FaRobot, FaLock, FaWallet } from 'react-icons/fa';

const features = [
    {
        icon: <FaChartLine className="text-yellow-500 text-4xl mb-4" />,
        title: 'Real-Time Gold Prices',
        description: 'Stay updated with live gold market trends and make informed decisions.',
    },
    {
        icon: <FaRobot className="text-yellow-500 text-4xl mb-4" />,
        title: 'AI-Based Predictions',
        description: 'Use advanced AI algorithms to predict future gold prices accurately.',
    },
    {
        icon: <FaLock className="text-yellow-500 text-4xl mb-4" />,
        title: 'Secure Transactions',
        description: 'Trade with confidence using our secure and transparent platform.',
    },
    {
        icon: <FaWallet className="text-yellow-500 text-4xl mb-4" />,
        title: 'Portfolio Tracking',
        description: 'Track your gold investments with real-time profit and loss updates.',
    },
];

const FeaturesSection = () => {
    return (
        <section id="features" className="bg-gray-950 text-white py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">
                    Why Choose <span className="text-yellow-500">TradyGold?</span>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-gray-900 p-8 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
                        >
                            {feature.icon}
                            <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                            <p className="text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
