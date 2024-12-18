import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    const [products] = useState([
        {
            id: 1,
            image: 'https://via.placeholder.com/300x400', // Замените на реальные ссылки изображений
            name: 'Пуховик мужской Athlex',
            price: 59140,
            oldPrice: '84 490',
            discount: '30',
            rating: 5,
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/300x400',
            name: 'Пуховик мужской FILA',
            price: 69640,
            oldPrice: '99 490',
            discount: '30',
            rating: 4,
        },
        {
            id: 3,
            image: 'https://via.placeholder.com/300x400',
            name: 'Куртка утепленная мужская Volkl',
            price: 69640,
            oldPrice: '99 490',
            discount: '30',
            rating: 3,
        },
        {
            id: 4,
            image: 'https://via.placeholder.com/300x400',
            name: 'Куртка утепленная мужская Volkl',
            price: 55640,
            oldPrice: '79 490',
            discount: '30',
            rating: 4,
        },
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
