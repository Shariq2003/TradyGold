import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import goldReducer from "./slices/goldSlice";
import tradeReducer from "./slices/tradeSlice";
import settingsReducer from "./slices/settingsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        gold: goldReducer,
        trade: tradeReducer,
        settings: settingsReducer,
    },
});
