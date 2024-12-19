
import React from "react";
import { useStore } from "../context/StoreContext";

function Cart() {
    const { cart } = useStore();

    // Преобразуем каждую цену из строки в число и суммируем
    const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

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
                            <div className="h-72 overflow-hidden">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover"/>
                            </div>
                            <span className="text-2xl font-bold text-gray-800 mb-2">{item.title}</span>
                            <span className="text-xl font-bold text-gray-800 mb-2">${formatNumber(parseFloat(item.price))}</span>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4 text-right font-bold text-xl">
                Total: ${formatNumber(total)}
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Proceed to Checkout
            </button>
        </div>
    );
}

export default Cart;