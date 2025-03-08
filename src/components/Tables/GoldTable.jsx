import React from "react";

const GoldTable = ({ goldData }) => {
    if (!goldData) {
        return <p className="text-center text-gray-400">No data available</p>;
    }

    const goldPrices = [
        { carat: "24K", price: goldData.price_gram_24k },
        { carat: "22K", price: goldData.price_gram_22k },
        { carat: "21K", price: goldData.price_gram_21k },
        { carat: "20K", price: goldData.price_gram_20k },
        { carat: "18K", price: goldData.price_gram_18k },
        { carat: "16K", price: goldData.price_gram_16k },
        { carat: "14K", price: goldData.price_gram_14k },
        { carat: "10K", price: goldData.price_gram_10k },
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
                            <td className="p-3 border border-gray-700">₹ {gold.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GoldTable;
