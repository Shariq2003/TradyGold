import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/Sections/HeroSection';
import FeaturesSection from '../components/Sections/FeaturesSection';
import GoldPriceChartSection from '../components/Sections/GoldPriceChartSection';
import HowItWorksSection from '../components/Sections/HowItWorksSection';
import TestimonialsSection from '../components/Sections/TestimonialsSection';
import CTASection from '../components/Sections/CTASection';
import Footer from '../components/Footer';
import NewsTicker from '../components/NewsTicker';

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <GoldPriceChartSection />
            <HowItWorksSection />
            <TestimonialsSection />
            <CTASection />
            <Footer />
            <NewsTicker />
        </div>
    );
};

export default LandingPage;
