import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";

import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import goldReducer from "./slices/goldSlice";
import tradeReducer from "./slices/tradeSlice";
import settingsReducer from "./slices/settingsSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    gold: goldReducer,
    trade: tradeReducer,
    settings: settingsReducer,
});

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth", "user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(thunk),
});

export const persistor = persistStore(store);