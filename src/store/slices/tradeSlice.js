import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tradeHistory: [],
};

const tradeSlice = createSlice({
    name: "trade",
    initialState,
    reducers: {
        addTrade: (state, action) => {
            state.tradeHistory.push(action.payload);
        },
        clearTradeHistory: (state) => {
            state.tradeHistory = [];
        },
    },
});

export const { addTrade, clearTradeHistory } = tradeSlice.actions;
export default tradeSlice.reducer;
