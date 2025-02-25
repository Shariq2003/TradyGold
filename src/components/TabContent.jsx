import React from "react";
import Dashboard from "../pages/Dashboard";
import Analysis from "../pages/Analysis";
// Import other components when ready
// import Buy from "../pages/Buy";
// import Sell from "../pages/Sell";
import UserProfile from "../pages/UserProfile";

const TabContent = ({ activeTab }) => {
    const content = {
        Dashboard: <Dashboard />,
        Analysis: <Analysis />,
        Buy: <div>Buy Page Content</div>,
        Sell: <div>Sell Page Content</div>,
        Profile: <UserProfile/>,
    };

    return (
        <div className="w-[100%] p-3">
            <h2 className="text-3xl font-semibold mb-4">{activeTab}</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">{content[activeTab]}</div>
        </div>
    );
};

export default TabContent;
