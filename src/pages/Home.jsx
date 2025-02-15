import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TabContent from "../components/TabContent";

const Home = () => {
    const tabs = ["Dashboard", "Profile", "Settings", "Reports"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            <TabContent activeTab={activeTab} />
        </div>
    );
};

export default Home;
