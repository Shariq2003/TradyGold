import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const login = (authToken, userId) => {
        setToken(authToken);
        setUserId(userId);
        setIsLoggedIn(true);
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("userId", userId);
    };

    const logout = () => {
        setToken(null);
        setUserId(null);
        setIsLoggedIn(false);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
