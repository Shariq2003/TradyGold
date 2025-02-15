import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import TabContent from "../components/TabContent";

const Home = () => {
    const tabs = ["Dashboard", "Profile", "Settings", "Reports"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div className="flex bg-gray-100">
            <Sidebar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
            <div className="pt-8 px-28 flex-grow overflow-auto h-screen">
                <TabContent activeTab={activeTab} />
            </div>
        </div>
    );
};

export default Home;
