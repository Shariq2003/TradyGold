import axios from "axios";

export const fetchLiveGoldPrice = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/live-prices/"); 
        return (response.data.price / 28.3495).toFixed(4);
    } catch (error) {
        console.error("Error fetching gold price:", error);
        throw error;
    }
};
