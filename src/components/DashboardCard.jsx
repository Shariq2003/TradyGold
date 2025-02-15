import React from "react";

const DashboardCard = ({ title, icon, value, color }) => {
    return (
        <div className={`p-6 rounded-lg shadow-md text-white flex flex-col items-center justify-center ${color}`}>
            <div className="text-4xl">{icon}</div>
            <h3 className="text-lg font-semibold mt-2">{title}</h3>
            <p className="text-xl font-bold">{value}</p>
        </div>
    );
};

export default DashboardCard;
