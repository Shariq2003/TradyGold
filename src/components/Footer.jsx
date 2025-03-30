import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
    return (
<footer className="bg-gray-950 text-gray-400 py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white text-2xl font-bold mb-4">TradyGold</h3>
                        <p>Your AI-powered gold investment platform. Predict. Trade. Prosper.</p>
                    </div>
                    <div>
                        <h4 className="text-white text-xl font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#features" className="hover:text-yellow-500">Features</a></li>
                            <li><a href="#chart" className="hover:text-yellow-500">Gold Price Chart</a></li>
                            <li><a href="#how-it-works" className="hover:text-yellow-500">How It Works</a></li>
                            <li><a href="#testimonials" className="hover:text-yellow-500">Testimonials</a></li>
                            <li><a href="#cta" className="hover:text-yellow-500">Sign Up</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white text-xl font-semibold mb-4">Contact Us</h4>
                        <p>Email: <a href="mailto:support@tradygold.com" className="hover:text-yellow-500">support@tradygold.com</a></p>
                        <p>Phone: <a href="tel:+911234567890" className="hover:text-yellow-500">+91 12345 67890</a></p>
                    </div>
                    <div>
                        <h4 className="text-white text-xl font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="/" className="text-yellow-500 hover:text-white"><FaFacebookF size={24} /></a>
                            <a href="/" className="text-yellow-500 hover:text-white"><FaTwitter size={24} /></a>
                            <a href="/" className="text-yellow-500 hover:text-white"><FaInstagram size={24} /></a>
                            <a href="/" className="text-yellow-500 hover:text-white"><FaLinkedinIn size={24} /></a>
                        </div>
                    </div>
                </div>
                <div className="text-center text-gray-500 mt-12">
                    <p>© {new Date().getFullYear()} TradyGold. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
