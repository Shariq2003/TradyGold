import React from 'react';
import { FaUserPlus, FaChartLine, FaCoins } from 'react-icons/fa';

const steps = [
    {
        icon: <FaUserPlus className="text-yellow-500 text-5xl mb-6" />,
        title: 'Sign Up',
        description: 'Create your TradyGold account in just a few simple steps.',
    },
    {
        icon: <FaChartLine className="text-yellow-500 text-5xl mb-6" />,
        title: 'Analyze Trends',
        description: 'Track live gold prices and view AI-powered predictions.',
    },
    {
        icon: <FaCoins className="text-yellow-500 text-5xl mb-6" />,
        title: 'Trade & Earn',
        description: 'Buy or sell gold securely and monitor your portfolio growth.',
    },
];

const HowItWorksSection = () => {
    return (
        <section id="how-it-works" className="bg-gray-950 text-white py-20">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-12">
                    How <span className="text-yellow-500">TradyGold</span> Works
                </h2>

                <div className="flex flex-col md:flex-row justify-center gap-12">
                    {steps.map((step, index) => (
                        <div key={index} className="flex-1 text-center p-8 bg-gray-900 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                            {step.icon}
                            <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                            <p className="text-gray-400">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;
