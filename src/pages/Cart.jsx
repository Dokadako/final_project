import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { Link } from "react-router-dom";
import { API_URL } from "../API";

function Cart() {
    const { cart, setCart } = useStore();
    const [quantities, setQuantities] = useState(cart.map(() => 1));

    const handleQuantityChange = (index, delta) => {
        setQuantities((prev) => {
            const newQuantities = [...prev];
            newQuantities[index] = Math.max(newQuantities[index] + delta, 1);
            return newQuantities;
        });
    };

    const handleRemoveItem = (index) => {
        setCart((prev) => prev.filter((_, i) => i !== index));
        setQuantities((prev) => prev.filter((_, i) => i !== index));
    };

    const total = cart.reduce(
        (sum, item, index) => sum + parseFloat(item.price) * quantities[index],
        0
    );

    const formatNumber = (number) => {
        return new Intl.NumberFormat("ru-RU").format(number);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Shopping Cart</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <ul className="mt-4 space-y-4">
                    {cart.map((item, index) => (
                        <li
                            key={index}
                            className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded shadow"
                        >
                            <Link to={`/product/${item.id}`} className="block">
                                <div className="w-24 h-24 overflow-hidden rounded mx-auto sm:mx-0">
                                    <img
                                        src={
                                            item.imageUrls.length
                                                ? `${API_URL}/files/${item.imageUrls[0]}`
                                                : null
                                        }
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </Link>
                            <div className="flex-grow mt-4 sm:mt-0 sm:ml-4">
                <span className="text-xl font-bold text-gray-800">
                  {item.name}
                </span>
                                <div className="flex items-center mt-2">
                  <span className="text-gray-800 mr-4">
                    {formatNumber(parseFloat(item.price))} ₸/unit
                  </span>
                                    <button
                                        className="bg-gray-200 px-2 py-1 rounded"
                                        onClick={() => handleQuantityChange(index, -1)}
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">{quantities[index]}</span>
                                    <button
                                        className="bg-gray-200 px-2 py-1 rounded"
                                        onClick={() => handleQuantityChange(index, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    className="bg-red-500 text-white px-4 py-1 rounded mt-2"
                                    onClick={() => handleRemoveItem(index)}
                                >
                                    Remove
                                </button>
                            </div>
                            <span className="text-xl font-bold text-gray-800 mt-4 sm:mt-0 sm:ml-4">
                {formatNumber(parseFloat(item.price) * quantities[index])}₸
              </span>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-4 text-right font-bold text-xl">
                Total: {formatNumber(total)}₸
            </div>
            <Link
                className="bg-[#aa783d] text-white px-4 py-2 rounded mt-4"
                to="/checkout"
            >
                Proceed to Checkout
            </Link>
        </div>
    );
}

export default Cart;