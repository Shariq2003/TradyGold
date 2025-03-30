import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <nav className="fixed top-0 w-full bg-gray-900 text-white z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <a href="/" className="text-2xl font-bold text-yellow-500">TradyGold</a>
                <div className="hidden md:flex space-x-4">
                    <Link to="/signin" className="text-white px-4 py-2 border border-yellow-500 rounded hover:bg-yellow-500 transition">
                        Login
                    </Link>
                    <Link to="/signup" className="text-white px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600 transition">
                        Sign Up
                    </Link>
                </div>
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white text-3xl">
                        {isMenuOpen ? '✖' : '☰'}
                    </button>
                </div>
            </div>
            <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
                <div className="bg-gray-800 p-4">
                    <Link to="/signin" className="block text-white py-2 border-b border-gray-700">Login</Link>
                    <Link to="/signup" className="block text-white py-2 border-b border-gray-700">Sign Up</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
