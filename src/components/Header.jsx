import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-blue-600 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">Gold Prediction App</h1>
                <nav className="space-x-4">
                    <Link to="/" className="hover:underline">Dashboard</Link>
                    <Link to="/signin" className="hover:underline">Sign In</Link>
                    <Link to="/signup" className="hover:underline">Sign Up</Link>
                    <Link to="/buysell" className="hover:underline">Buy/Sell Gold</Link>
                    <Link to="/profile" className="hover:underline">Profile</Link>
                </nav>
            </div>
        </header>
    );
}

export default Header;
