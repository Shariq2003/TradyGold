import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("authToken") || null,
    isAuthenticated: !!localStorage.getItem("authToken"),
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
            localStorage.setItem("authToken", action.payload);
        },
        logout: (state) => {
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem("authToken");
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
