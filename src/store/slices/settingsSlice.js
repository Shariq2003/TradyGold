import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    darkMode: false,
    notifications: true,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        },
        toggleNotifications: (state) => {
            state.notifications = !state.notifications;
        },
    },
});

export const { toggleDarkMode, toggleNotifications } = settingsSlice.actions;
export default settingsSlice.reducer;
