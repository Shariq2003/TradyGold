import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    goldAvailable: "0",
    portfolio: "0",
    goldBought: "0",
    goldSold: "0",
};

const tradeSlice = createSlice({
    name: "trade",
    initialState,
    reducers: {
        updateGoldAvailable: (state, action) => {
            state.goldAvailable = action.payload;
        },
        updatePortfolio: (state, action) => {
            state.portfolio = action.payload;
        },
        updateGoldBought: (state, action) => {
            state.goldBought = action.payload;
        },
        updateGoldSold: (state, action) => {
            state.goldSold = action.payload;
        },
    },
});

export const { updateGoldAvailable, updatePortfolio, updateGoldBought, updateGoldSold } = tradeSlice.actions;
export default tradeSlice.reducer;
