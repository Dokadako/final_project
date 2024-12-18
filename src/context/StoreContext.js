import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    const [products] = useState([
        { id: 1, name: "Product 1", price: 100, description: "Description 1" },
        { id: 2, name: "Product 2", price: 150, description: "Description 2" },
    ]);
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
    };

    return (
        <StoreContext.Provider value={{ products, cart, addToCart }}>
            {children}
        </StoreContext.Provider>
    );
};
