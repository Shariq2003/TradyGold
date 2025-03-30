import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/Sections/HeroSection';
import FeaturesSection from '../components/Sections/FeaturesSection';
import GoldPriceChartSection from '../components/Sections/GoldPriceChartSection';
import HowItWorksSection from '../components/Sections/HowItWorksSection';
import TestimonialsSection from '../components/Sections/TestimonialsSection';
import CTASection from '../components/Sections/CTASection';
import Footer from '../components/Footer';

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
        </div>
    );
};

export default LandingPage;
