import { useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
    updateGoldAvailable,
    updateGoldBought,
    updateGoldSold,
    updatePortfolio,
    updateBalance,
} from "../store/slices/tradeSlice";

const useFetchTradeData = () => {
    const dispatch = useDispatch();

    const fetchTradeData = useCallback(async (token) => {
        if (!token) return;

        try {
            const res = await axios.get("http://localhost:5000/api/trade/profile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { goldAvailable, goldBought, goldSold, portfolio, balance } = res.data;

            dispatch(updateGoldAvailable(Number(goldAvailable)));
            dispatch(updateGoldBought(Number(goldBought)));
            dispatch(updateGoldSold(Number(goldSold)));
            dispatch(updatePortfolio(Number(portfolio)));
            dispatch(updateBalance(Number(balance)));
        } catch (err) {
            console.error("Error fetching trade data:", err);
        }
    }, [dispatch]);

    return fetchTradeData;
};

export default useFetchTradeData;
