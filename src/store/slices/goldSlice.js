import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    livePrice: 0,
    trend: [],
    prediction: null,
};

const goldSlice = createSlice({
    name: "gold",
    initialState,
    reducers: {
        setGoldData: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});

export const { setGoldData } = goldSlice.actions;
export default goldSlice.reducer;
