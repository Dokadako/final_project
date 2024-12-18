import React from "react";
import { useStore } from "../context/StoreContext";

function Cart() {
    const { cart } = useStore();
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const formatNumber = (number) => {
        return new Intl.NumberFormat('ru-RU').format(number); // Используем локаль 'ru-RU' для пробелов
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <ul className="mt-4">
                    {cart.map((item, index) => (
                        <li key={index} className="flex justify-between bg-white p-4 rounded shadow mt-2">
                            <span>{item.name}</span>
                            <span>${formatNumber(item.price)}</span>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4 text-right font-bold text-xl">Total: ${formatNumber(total)}</div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Proceed to Checkout
            </button>
        </div>
    );
}

export default Cart;
