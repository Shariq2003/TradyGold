import React from 'react';
import HeroImage from '../../assets/images/HeroImage.avif';
import GoldCalculatorCard from '../GoldCalculatorCard';

const HeroSection = () => {
    return (
        <section
            className="relative bg-gray-900 text-white h-screen flex items-center bg-cover bg-center"
            style={{ backgroundImage: `url(${HeroImage})` }}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gray-900 via-transparent to-gray-900 opacity-70"></div>
            <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row justify-between items-center">
                <div className="max-w-2xl">
                    <h1 className="text-5xl font-bold leading-tight mb-6">
                        Smart Gold Trading with <span className="text-yellow-500">AI Predictions</span>
                    </h1>
                    <p className="text-lg mb-8">
                        Invest in gold smarter with real-time insights, accurate predictions, and a seamless trading experience.
                    </p>
                    <a href="/signup" className="px-6 py-3 text-lg bg-yellow-500 rounded hover:bg-yellow-600 transition">
                        Get Started
                    </a>
                </div>
                <div className="mt-10 md:mt-0">
                    <GoldCalculatorCard />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
