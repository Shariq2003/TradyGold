import axios from "axios";

export const fetchLiveGoldPrice = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/live-prices/"); 
        const priceData = await response.json();
        return priceData.price;
    } catch (error) {
        console.error("Error fetching gold price:", error);
        throw error;
    }
};
