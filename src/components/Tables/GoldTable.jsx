import React from "react";

const GoldTable = ({ goldData }) => {
    if (!goldData || Object.keys(goldData).length === 0) {
        return <p className="text-center text-gray-400">No data available</p>;
    }

    const goldPrices = [
        { carat: "24K", price: goldData.price / 28.3495 },
        { carat: "22K", price: (goldData.price / 28.3495) * 0.9167 },
        // { carat: "21K", price: goldData.price_gram_24k },
        { carat: "20K", price: (goldData.price / 28.3495) * 0.8333 },
        { carat: "18K", price: (goldData.price / 28.3495) * 0.75 },
        { carat: "16K", price: (goldData.price / 28.3495) * 0.6667 },
        { carat: "14K", price: (goldData.price / 28.3495) * 0.5833 },
        { carat: "10K", price: (goldData.price / 28.3495) * 0.4167 },
    ];

    return (
        <div className="w-full mx-auto p-4 bg-gray-900 text-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-center">
                Live Gold Prices - {new Date().toLocaleDateString()}
            </h2>
            <table className="w-full border-collapse border border-gray-700">
                <thead className="bg-gray-800">
                    <tr>
                        <th className="p-3 text-left border border-gray-700">Carat</th>
                        <th className="p-3 text-left border border-gray-700">Price (₹ per gram)</th>
                    </tr>
                </thead>
                <tbody>
                    {goldPrices.map((gold, index) => (
                        <tr key={index} className="border-t border-gray-700 hover:bg-gray-800">
                            <td className="p-3 border border-gray-700">{gold.carat}</td>
                            <td className="p-3 border border-gray-700">
                                {gold.price !== undefined ? `₹ ${gold.price.toFixed(2)}` : "N/A"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GoldTable;
