import React from "react";
import { useStore } from "../context/StoreContext";

function Cart() {
    const { cart } = useStore();
    const total = cart.reduce((sum, item) => sum + item.price, 0);

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
                            <span>${item.price}</span>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4 text-right font-bold text-xl">Total: ${total}</div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Proceed to Checkout
            </button>
        </div>
    );
}

export default Cart;
