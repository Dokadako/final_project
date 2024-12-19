import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';  // Импортируем нужную функцию из uuid

const StoreContext = createContext();
export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                const productsWithId = response.data.map(product => ({
                    ...product,
                    id: uuidv4()  // Генерируем уникальный идентификатор для каждого продукта
                }));
                setProducts(productsWithId);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <StoreContext.Provider value={{ products, cart, addToCart }}>
            {children}
        </StoreContext.Provider>
    );
};