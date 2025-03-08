import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Dashboard from "../pages/Dashboard";
import Analysis from "../pages/Analysis";
import Buy from "../pages/Buy";
import Sell from "../pages/Sell";
import UserProfile from "../pages/UserProfile";

const TabContent = ({ activeTab }) => {
    const [loading, setLoading] = useState(false);
    const [currentContent, setCurrentContent] = useState(null);

    useEffect(() => {
        setLoading(true);
        const loadingToast = toast.loading(`Loading ${activeTab}...`);

        setTimeout(() => {
            const content = {
                Dashboard: <Dashboard />,
                Analysis: <Analysis />,
                Buy: <Buy />,
                Sell: <Sell />,
                Profile: <UserProfile />,
            };

            setCurrentContent(content[activeTab]);
            toast.dismiss(loadingToast);
            toast.success(`${activeTab} loaded successfully!`);
            setLoading(false);
        }, 1000);
    }, [activeTab]);

    return (
        <div className="w-[100%] p-3">
            <h1 className="text-5xl font-semibold mb-4 text-white">{activeTab}</h1>
            <div className="bg-gray-900 p-4 rounded-lg shadow-md">
                {loading ? <p className="text-white text-center">Loading...</p> : currentContent}
            </div>
        </div>
    );
};

export default TabContent;
