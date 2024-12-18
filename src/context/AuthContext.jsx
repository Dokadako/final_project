import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const login = () => setIsLoggedIn(true);
    const logout = () => setIsLoggedIn(false);
    const addToCart = () => setCartCount((prev) => prev + 1);

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, cartCount, addToCart }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
