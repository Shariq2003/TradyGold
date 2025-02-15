import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: !!localStorage.getItem("authToken"),
    token: localStorage.getItem("authToken") || null,
    userId: localStorage.getItem("userId") || null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.isLoggedIn = true;
            localStorage.setItem("authToken", action.payload.token);
            localStorage.setItem("userId", action.payload.userId);
        },
        logout: (state) => {
            state.token = null;
            state.userId = null;
            state.isLoggedIn = false;
            localStorage.removeItem("authToken");
            localStorage.removeItem("userId");
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
