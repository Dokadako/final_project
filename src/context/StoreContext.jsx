import React, { createContext, useContext, useState, useEffect } from "react";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem("cart");
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Failed to parse cart from localStorage", error);
            return [];
        }
    });

    const [wishlist, setWishlist] = useState(() => {
        try {
            const storedWishlist = localStorage.getItem("wishlist");
            return storedWishlist ? JSON.parse(storedWishlist) : [];
        } catch (error) {
            console.error("Failed to parse wishlist from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
    };

    const addToWishlist = (product) => {
        setWishlist((prev) => [...prev, product]);
    };

    const removeFromWishlist = (productId) => {
        setWishlist((prev) => prev.filter((item) => item.id !== productId));
    };

    return (
        <StoreContext.Provider
            value={{
                cart,
                setCart,
                addToCart,
                wishlist,
                addToWishlist,
                removeFromWishlist,
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};