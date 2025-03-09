import React from "react";
import Dashboard from "../pages/Dashboard";
import Analysis from "../pages/Analysis";
import Buy from "../pages/Buy";
import Sell from "../pages/Sell";
import UserProfile from "../pages/UserProfile";

const TabContent = ({ activeTab }) => {
    const content = {
        Dashboard: <Dashboard />,
        Analysis: <Analysis />,
        Buy: <Buy />,
        Sell: <Sell />,
        Profile: <UserProfile />,
    };

    return (
        <div className="w-[100%] p-3">
            <h1 className="text-5xl font-semibold mb-4 text-white">{activeTab}</h1>
            <div className="bg-gray-900 p-4 rounded-lg shadow-md">
                {content[activeTab] || <p className="text-white text-center">Tab not found</p>}
            </div>
        </div>
    );
};

export default TabContent;